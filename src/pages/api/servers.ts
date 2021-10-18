import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';
import { ParsedBodyServer, ServerInterface } from '../../context/interfaces';

const bcrypt = require('bcryptjs');

const servers = async (req: NextApiRequest, res: NextApiResponse) => {
  let hashedPassword: string;
  let SQLquery: string;

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
        const parsedBody: ParsedBodyServer = JSON.parse(req.body);
        const { name, endpoint, password, port } = parsedBody;

        hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
        SQLquery = `INSERT INTO "serverCloud" (name,endpoint,port,password,user_id)
          VALUES ('${name}','${endpoint}',${port},'${hashedPassword}',${userId});`;
        await db.query(SQLquery);

        SQLquery = `INSERT INTO "${process.env.PG_TABLE_REDIS}" (user_id,endpoint,password)
          VALUES (${userId},'${endpoint}','${password}');`;

        await db.query(SQLquery);

        return res.status(200).json({ success: true });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        return res.status(400).json({ success: false, error: err });
      }

    case 'DELETE':
      try {
        const parsedBody: ServerInterface = JSON.parse(req.body);
        const { name } = parsedBody;
        SQLquery = `DELETE FROM "serverCloud" WHERE name = '${name}' AND user_id = ${userId}
        RETURNING endpoint;`;

        const endpointRows = await db.query(SQLquery);
        const { endpoint } = endpointRows.rows[0];

        SQLquery = `DELETE FROM "${process.env.PG_TABLE_REDIS}" WHERE endpoint = '${endpoint}' AND user_id = ${userId};`;
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
