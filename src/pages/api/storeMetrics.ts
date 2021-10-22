import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';
import { Metrics } from '../../context/interfaces';

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

  const [monthCookie, dayCookie, yearCookie] = lastCalled
    .split(' ')
    .slice(1, 4);
  const today = new Date();
  const day: string = String(today.getDate());
  const month: string = String(today.getMonth() + 1);
  const year: string = String(today.getFullYear());
  const dateCheck =
    day === dayCookie &&
    month === monthToNum[monthCookie] &&
    year === yearCookie;
  switch (method) {
    case 'POST':
      try {
        let SQLQuery = '';
        // if (previouslyCalled && dateCheck) is true, then that means we have already
        // created set of columns for this server and we only have to update and not insert
        if (previouslyCalled && dateCheck) {
          SQLQuery = ``;
          const parsedBody: Metrics = JSON.parse(req.body);
          Object.entries(parsedBody).forEach(([metricName, metricValue]) => {
            SQLQuery += `UPDATE "${process.env.PG_TABLE_METRICS}"
                SET value = ARRAY[${metricValue}] 
                WHERE 
                user_id = ${userID} AND
                server_id = ${serverID} AND 
                name = '${metricName}' AND
                date = CURRENT_DATE;
                 \n`;
          });
        } else {
          SQLQuery = `
        INSERT INTO "${process.env.PG_TABLE_METRICS}" (user_id,server_id,name,value) VALUES`;
          const parsedBody: Metrics = JSON.parse(req.body);
          Object.entries(parsedBody).forEach(
            ([metricName, metricValue], index) => {
              if (index < Object.keys(parsedBody).length - 1) {
                SQLQuery += `(${userID},${serverID},'${metricName}',
            ARRAY[${metricValue}]), \n`;
              } else {
                SQLQuery += `(${userID},${serverID},'${metricName}',
            ARRAY[${metricValue}]); \n`;
              }
            }
          );
          SQLQuery += `UPDATE "${process.env.PG_TABLE_CLOUD}"
          SET lastcalled = CURRENT_DATE,
          previouslycalled = true
          WHERE id = ${serverID};`;
          cookies.set('previouslyCalled', 'true');
        }

        await db.query(SQLQuery);

        return res.status(200).json({ success: true });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, error: err });
      }
    default:
      return res.status(400).json({ error: 'Error within verifyEndpoint' });
  }
};
export default storeMetrics;

/*
CREATE TEMPORARY TABLE temp_table (
              LIKE "metrics" INCLUDING DEFAULTS);
          
          INSERT INTO "temp_table" (id,user_id,server_id,name,value) VALUES(1,24,86,'used_memory',
            ARRAY[',2.21,2.21,2.21,2.21,2.21,2.21,2.37']), 
(2,24,86,'connected_clients',
            ARRAY[',0,0,0,0,2,1,1']), 
(3,24,86,'evicted_keys',
            ARRAY[',0,0,0,0,0,0,0']), 
(4,24,86,'keyspace_hits',
            ARRAY[',21216,21216,21216,21216,21216,21216,21216']), 
(5,24,86,'keyspace_misses',
            ARRAY[',18665,18665,18665,18665,18665,18665,18665']), 
(6,24,86,'total_net_input_bytes',
            ARRAY[',157.86,157.86,157.86,157.86,157.86,157.86,157.86']), 
(7,24,86,'uptime_in_seconds',
            ARRAY[',580,580,580,580,580,580,580']), 
(8,24,86,'time',
            ARRAY['14:33:03,14:33:13,14:33:23,14:33:23,14:33:29,14:33:33,14:33:38']);
			
INSERT INTO "metrics" (user_id,server_id,name,value)
SELECT user_id,server_id,name,value FROM temp_table 
        WHERE user_id = 24 AND server_id = 86 and date = CURRENT_DATE;
        
        */
