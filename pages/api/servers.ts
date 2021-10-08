import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';

const bcrypt = require('bcryptjs');

const servers = async (req: NextApiRequest, res: NextApiResponse) => {
  let hashedPassword: string;
  let SQLquery: string;
  let SQLqueryCloud: string;
  let SQLqueryLocal: string;
  type Server = {
    name: string;
    IP: string;
    PORT: string;
    endPoint: string;
    password: string;
  };

  const cookies: Cookies = new Cookies(req, res);
  const userId: String = cookies.get('ssid');

  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        SQLqueryCloud = `SELECT name,endpoint FROM "serverCloud" WHERE user_id = ${userId};`;
        SQLqueryLocal = `SELECT name,IP,PORT FROM "serverLocal" WHERE user_id = ${userId};`;

        const cloudDataFull = await db.query(SQLqueryCloud);
        const cloud: String[] = cloudDataFull.rows;
        const localDataFull = await db.query(SQLqueryLocal);
        const local: String[] = localDataFull.rows;

        return res.status(200).json({ success: true, cloud, local });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        return res.status(400).json({ success: false, error: err });
      }

    case 'POST':
      try {
        const parsedBody: Server = JSON.parse(req.body);
        const { name, IP, PORT, endPoint, password } = parsedBody;

        if (endPoint && password) {
          hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
          SQLquery = `INSERT INTO "serverCloud" (name,endpoint,password,user_id)
                 VALUES ('${name}','${endPoint}','${hashedPassword}',${userId});`;
        } else {
          SQLquery = `INSERT INTO "serverLocal" (name,IP,PORT,user_id)
                 VALUES ('${name}','${IP}','${PORT}',${userId});`;
        }
        await db.query(SQLquery);

        return res.status(200).json({ success: true });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        return res.status(400).json({ success: false, error: err });
      }
    case 'DELETE':
      try {
        const parsedBody: Server = JSON.parse(req.body);
        const { name, endPoint, password } = parsedBody;
        if (endPoint && password) {
          SQLquery = `DELETE FROM "serverCloud" WHERE servername = '${name}' AND user_id = ${userId};`;
        } else {
          SQLquery = `DELETE FROM "serverLocal" where servername = '${name}' AND user_id = ${userId};`;
        }

        await db.query(SQLquery);

        return res.status(200).json({ success: true });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        return res.status(400).json({ success: false, error: err });
      }
    default:
      return res.status(400).json({ success: false, error: 'Invalid request' });
  }
};
export default servers;
