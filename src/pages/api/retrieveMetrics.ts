import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';

const Redis = require('ioredis');

const storeMetrics = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const cookies: Cookies = new Cookies(req, res);
  const userID = Number(cookies.get('ssid'));

  switch (method) {
    case 'GET': {
      try {
        const serverID = Number(cookies.get('serverID'));
        const metricsUpdated = [];

        const SQLQuery = `SELECT name,value FROM "${process.env.PG_TABLE_METRICS}" WHERE
        user_id = ${userID} AND server_id = ${serverID} AND date = CURRENT_DATE;`;
        const { rows } = await db.query(SQLQuery);

        if (rows.length === 0) {
          console.log(
            'Error in retrieveMetrics GET. Nothing returned from SQL'
          );
          return res.status(417).json({ success: false });
        }
        const numOfValues = rows[0].value.length;

        for (let i = 0; i < numOfValues; i += 1) {
          const currentObj = {};
          rows.forEach((metric: { value: string[]; name: string }) => {
            if (metric.value[i] === undefined) metric.value[i] = '';
            currentObj[metric.name] = metric.value[i];
          });
          metricsUpdated.push(currentObj);
        }

        return res.status(200).json({ success: true, metricsUpdated });
      } catch (err) {
        console.log('Error in retrieveMetrics GET ', err);
        return res.status(400).json({ success: false });
      }
    }
    case 'POST': {
      try {
        const parsedBody: { endpoint: string; date: string; metric: string } =
          JSON.parse(req.body);
        const { endpoint, date, metric } = parsedBody;

        const reformattedMetricName = metric
          .trim()
          .replace(/[' ']/g, '_')
          .toLowerCase();
        const redisStorageKey = `${endpoint}|${date}|${userID}|${reformattedMetricName}`;
        const redisStorageKeyTime = `${endpoint}|${date}|${userID}|time`;

        const redis = new Redis({
          host: process.env.REDIS_URL,
          port: process.env.REDIS_PORT,
          password: process.env.REDIS_PASSWORD,
          connectTimeout: 10000,
          reconnectOnError: false,
        });

        const cachedMetrics = await redis.lrange(redisStorageKey, 0, -1);
        const cachedMetricsTime = await redis.lrange(
          redisStorageKeyTime,
          0,
          -1
        );

        redis.quit();

        // Format data for front-end
        // iterate through the metric data and construct object
        // required for graphing must be in the shape of
        // [{metricName: value, time: value}]

        const arrayOfMetricObjects = [];
        for (let i = 0; i < cachedMetrics.length; i += 1) {
          const currentObj: { time: string; [metricName: string]: string } = {
            time: cachedMetricsTime[i],
          };
          currentObj[reformattedMetricName] = cachedMetrics[i];
          arrayOfMetricObjects.push(currentObj);
        }
        return res.status(200).json({ arrayOfMetricObjects });
      } catch (err) {
        console.log('Error in retrieveMetrics POST ', err);
        return res.status(400).json({ success: false });
      }
    }

    default:
      return res.status(400).json({ error: 'Error within retrieveMetrics' });
  }
};
export default storeMetrics;
