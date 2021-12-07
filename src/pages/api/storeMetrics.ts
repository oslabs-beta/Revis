import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';
import { Metrics, metricsSQLtoRedis } from '../../context/interfaces';
import { getDate } from '../../functions/globalFunctions';

const Redis = require('ioredis');

const storeMetrics = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const cookies: Cookies = new Cookies(req, res);
  const userID = Number(cookies.get('ssid'));
  const serverID = Number(cookies.get('serverID'));

  const today: Date = new Date();
  const dateKey: string = getDate(today);

  switch (method) {
    case 'GET': {
      try {
        const SQLQuery: string = `SELECT server_id,ta.name,tb.endpoint,value,date from "${process.env.PG_TABLE_METRICS}" AS ta 
      INNER JOIN "${process.env.PG_TABLE_CLOUD}" as tb on tb.id =server_id where ta.user_id = ${userID} ORDER BY date`;
        const { rows } = await db.query(SQLQuery);

        const redis = new Redis({
          host: process.env.REDIS_URL,
          port: process.env.REDIS_PORT,
          password: process.env.REDIS_PASSWORD,
          connectTimeout: 10000,
          reconnectOnError: false,
        });

        const serversAndDates = {};
        const indexTracker = {};

        rows.forEach(async (server: metricsSQLtoRedis) => {
          // Organize data to send to front end
          const { endpoint, date, name, value } = server;
          const metricDate: string = getDate(date);

          if (!(endpoint in serversAndDates)) {
            serversAndDates[endpoint] = [];
            indexTracker[endpoint] = 0;
          }
          const currentArr = serversAndDates[endpoint];
          const currentIndex = indexTracker[endpoint];
          if (currentArr[currentIndex - 1] !== metricDate) {
            serversAndDates[endpoint].push(metricDate);
            indexTracker[endpoint] += 1;
          }

          // Store in Redis
          const redisStorageKey = `${endpoint}|${metricDate}|${userID}|${name}`;
          const existInRedis = await redis.lrange(redisStorageKey, 0, -1);
          if (existInRedis.length === 0) {
            // Tell keys to expire after five days
            await redis.expire(redisStorageKey, 60 * 60 * 24 * 5);
          }
        });

        setTimeout(() => redis.quit(), 5000);

        return res.status(200).json({ serversAndDates });
      } catch (err) {
        console.log('Error in storeMetrics GET ', err);
        return res.status(400).json({ success: false });
      }
    }

    case 'POST':
      try {
        let SQLQuery: string = '';

        const parsedBody: Metrics = JSON.parse(req.body);
        Object.entries(parsedBody).forEach(([metricName, metricValue]) => {
          SQLQuery += `INSERT INTO "${process.env.PG_TABLE_METRICS}" as ta (id,user_id,server_id,name,value) VALUES ('${dateKey}-${userID}-${serverID}-${metricName}', ${userID},${serverID},'${metricName}',
            ARRAY[${metricValue}]) ON CONFLICT (id) DO UPDATE SET value = (CASE
              WHEN array_length(ta.value,1) < array_length(ARRAY[${metricValue}],1) THEN
               ta.value || ARRAY[${metricValue}] 
              ELSE ARRAY[${metricValue}]
              END)
            WHERE 
            ta.id = '${dateKey}-${userID}-${serverID}-${metricName}'; \n`;
        });
        SQLQuery += `UPDATE "${process.env.PG_TABLE_CLOUD}"
          SET lastcalled = CURRENT_DATE,
          previouslycalled = true
          WHERE id = ${serverID}
          RETURNING lastcalled;`;
        const result = await db.query(SQLQuery);
        const { rows } = result[result.length - 1];
        const { lastcalled } = rows[0];

        cookies.set('previouslyCalled', 'true');
        cookies.set('lastCalled', lastcalled);

        return res.status(200).json({ success: true });
      } catch (err) {
        console.log('Error in storeMetrics POST ', err);

        return res.status(400).json({ success: false });
      }
    default:
      return res.status(400).json({ error: 'Error within storeMetrics' });
  }
};
export default storeMetrics;
