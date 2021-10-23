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

  const today = new Date();
  const day: string = String(today.getDate());
  const month: string = String(today.getMonth() + 1);
  const year: string = String(today.getFullYear());

  switch (method) {
    case 'GET': {
      console.log('test');
      return res.status(200).json({ success: true });
      break;
    }
    case 'POST':
      try {
        const [monthCookie, dayCookie, yearCookie] = lastCalled
          .split(' ')
          .slice(1, 4);
        const dateCheck =
          day === dayCookie &&
          month === monthToNum[monthCookie] &&
          year === yearCookie;
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
