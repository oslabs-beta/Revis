import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';

const bcrypt = require('bcryptjs');

const servers = async (req: NextApiRequest, res: NextApiResponse) => {
  let hashedPassword: string;
  let SQLquery: string;
  let SQLqueryCloud: string;
  type Server = {
    name: string;
    PORT: string;
    endpoint: string;
    password: string;
  };

  const cookies: Cookies = new Cookies(req, res);
  const userId: String = cookies.get('ssid');
  const SALT_WORK_FACTOR: number = 10;

  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        SQLquery = `SELECT * FROM "serverCloud" WHERE user_id = ${userId};`;
        const cloudDataFull = await db.query(SQLquery);
        const cloud: String[] = cloudDataFull.rows;
        return res.status(200).json({ success: true, cloud });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        return res.status(400).json({ success: false, error: err });
      }

    case 'POST':
      try {
        const parsedBody: Server = JSON.parse(req.body);
        const { name, endpoint, password, PORT } = parsedBody;

        hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
        SQLquery = `INSERT INTO "serverCloud" (name,endpoint,port,password,user_id)
          VALUES ('${name}','${endpoint}','${PORT}','${hashedPassword}',${userId});`;

        await db.query(SQLquery);
        return res.status(200).json({ success: true });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        return res.status(400).json({ success: false, error: err });
      }

    case 'DELETE':
      try {
        const parsedBody: Server = JSON.parse(req.body);
        const { name } = parsedBody;
        SQLquery = `DELETE FROM "serverCloud" WHERE name = '${name}' AND user_id = ${userId};`;
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
