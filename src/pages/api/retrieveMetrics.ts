import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';

const Redis = require('ioredis');

const monthToNum = {
  Jan: '1',
  Feb: '2',
  Mar: '3',
  Apr: '4',
  May: '5',
  Jun: '6',
  Jul: '7',
  Aug: '8',
  Sep: '9',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

const storeMetrics = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const cookies: Cookies = new Cookies(req, res);
  const userID = Number(cookies.get('ssid'));
  const today = new Date();
  const day: string = String(today.getDate());
  const month: string = String(today.getMonth() + 1);
  const year: string = String(today.getFullYear());

  switch (method) {
    case 'GET': {
      const serverID = Number(cookies.get('serverID'));
      const lastCalled: string = cookies.get('lastCalled');
      const previouslyCalled: boolean =
        cookies.get('previouslyCalled') === 'true';
      const [monthCookie, dayCookie, yearCookie] = lastCalled
        .split(' ')
        .slice(1, 4);
      const dateCheck: boolean =
        day === dayCookie &&
        month === monthToNum[monthCookie] &&
        year === yearCookie;
      if (previouslyCalled && dateCheck) {
        const SQLQuery = `SELECT DISTINCT on (name) name,value FROM ${process.env.PG_TABLE_METRICS} WHERE
        user_id = ${userID} AND server_id = ${serverID} AND date = CURRENT_DATE;`;
        const { rows } = await db.query(SQLQuery);
        const numOfValues = rows[0].value.length;

        const metricsUpdated = [];
        for (let i = 0; i < numOfValues; i++) {
          const currentObj = {};
          rows.forEach((metric) => {
            if (metric.value[i] === undefined) metric.value[i] = '';
            currentObj[metric.name] = metric.value[i];
          });
          metricsUpdated.push(currentObj);
        }

        return res.status(200).json({ success: true, metricsUpdated });
      }
      return res.status(200).json({ success: false });
    }
    case 'POST': {
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
        password: process.env.REDIS_PW,
        connectTimeout: 10000,
        reconnectOnError: false,
      });

      const cachedMetrics = await redis.lrange(redisStorageKey, 0, -1);
      const cachedMetricsTime = await redis.lrange(redisStorageKeyTime, 0, -1);
      redis.quit();

      // Format data for front-end
      // iterate through the metric data and construct object
      // required for graphing must be in the shape of
      // [{metricName: value, time: value}]
      const arrayOfMetricObjects = [];
      for (let i = 0; i < cachedMetrics.length; i++) {
        const currentObj = {};
        currentObj.time = cachedMetricsTime[i];
        currentObj[reformattedMetricName] = cachedMetrics[i];
        arrayOfMetricObjects.push(currentObj);
      }

      return res.status(200).json({ arrayOfMetricObjects });
    }

    default:
      return res.status(400).json({ error: 'Error within retrieveMetrics' });
  }
};
export default storeMetrics;
