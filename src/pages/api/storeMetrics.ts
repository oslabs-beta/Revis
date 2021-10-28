import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';
import { Metrics, metricsSQLtoRedis } from '../../context/interfaces';

const Redis = require('ioredis');

const storeMetrics = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const cookies: Cookies = new Cookies(req, res);
  const userID = Number(cookies.get('ssid'));
  const serverID = Number(cookies.get('serverID'));
  const lastCalled: string = cookies.get('lastCalled');
  const previouslyCalled: boolean = cookies.get('previouslyCalled') === 'true';

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

  const numToMonth = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };

  const today = new Date();
  const day: string = String(today.getDate());
  const month: string = String(today.getMonth() + 1);
  const year: string = String(today.getFullYear());
  const dateKey: string = `${month}-${day}-${year}`;

  switch (method) {
    case 'GET': {
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
        const currentDay: string = `${date.getDate()}`;
        const currentMonth: string = numToMonth[`${date.getMonth() + 1}`];
        const currentYear: string = `${today.getFullYear()}`;
        const fullDate: string = `${currentMonth}-${currentDay}-${currentYear}`;

        if (!(endpoint in serversAndDates)) {
          serversAndDates[endpoint] = [];
          indexTracker[endpoint] = 0;
        }
        const currentArr = serversAndDates[endpoint];
        const currentIndex = indexTracker[endpoint];
        if (currentArr[currentIndex - 1] !== fullDate) {
          serversAndDates[endpoint].push(fullDate);
          indexTracker[endpoint] += 1;
        }

        // Store in Redis
        const redisStorageKey = `${endpoint}|${fullDate}|${userID}|${name}`;
        const existInRedis = await redis.lrange(redisStorageKey, 0, -1);
        if (existInRedis.length === 0) {
          await redis.rpush(redisStorageKey, value);
          // Tell keys to expire after five hours
          await redis.expire(redisStorageKey, 60 * 60 * 5);
        }
      });

      setTimeout(() => redis.quit(), 5000);

      return res.status(200).json({ serversAndDates });
    }
    case 'POST':
      try {
        const [monthCookie, dayCookie, yearCookie] = lastCalled
          .split(' ')
          .slice(1, 4);
        const dateCheck: boolean =
          day === dayCookie &&
          month === monthToNum[monthCookie] &&
          year === yearCookie;
        let SQLQuery: string = '';
        // if (previouslyCalled && dateCheck) is true, then that means we have already
        // created set of columns for this server and we only have to update and not insert
        if (previouslyCalled && dateCheck) {
          SQLQuery = '';
          const parsedBody: Metrics = JSON.parse(req.body);
          Object.entries(parsedBody).forEach(([metricName, metricValue]) => {
            SQLQuery += `UPDATE "${process.env.PG_TABLE_METRICS}"
                SET value =  (CASE
                  WHEN array_length(value,1) < array_length(ARRAY[${metricValue}],1) THEN
                   value || ARRAY[${metricValue}] 
                  ELSE ARRAY[${metricValue}]
                  END)
                WHERE 
                id = '${dateKey}-${userID}-${serverID}-${metricName}';
                 \n`;
          });
          await db.query(SQLQuery);
        } else {
          SQLQuery = `
        INSERT INTO "${process.env.PG_TABLE_METRICS}" (id,user_id,server_id,name,value) VALUES`;
          const parsedBody: Metrics = JSON.parse(req.body);
          Object.entries(parsedBody).forEach(
            ([metricName, metricValue], index) => {
              if (index < Object.keys(parsedBody).length - 1) {
                SQLQuery += `('${dateKey}-${userID}-${serverID}-${metricName}', ${userID},${serverID},'${metricName}',
            ARRAY[${metricValue}]), \n`;
              } else {
                SQLQuery += `('${dateKey}-${userID}-${serverID}-${metricName}',${userID},${serverID},'${metricName}',
            ARRAY[${metricValue}]); \n`;
              }
            }
          );
          SQLQuery += `UPDATE "${process.env.PG_TABLE_CLOUD}"
          SET lastcalled = CURRENT_DATE,
          previouslycalled = true
          WHERE id = ${serverID}
          RETURNING lastcalled;`;
          const result = await db.query(SQLQuery);
          const { rows } = result[1];
          const { lastcalled } = rows[0];

          cookies.set('previouslyCalled', 'true');
          cookies.set('lastCalled', lastcalled);
        }

        return res.status(200).json({ success: true });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      }
    default:
      return res.status(400).json({ error: 'Error within storeMetrics' });
  }
};
export default storeMetrics;
