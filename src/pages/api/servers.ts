import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';
import { ParsedBodyServer, ServerInterface } from '../../context/interfaces';

const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');

const servers = async (req: NextApiRequest, res: NextApiResponse) => {
  let hashedPassword: string;
  let SQLquery: string = '';

  const cookies: Cookies = new Cookies(req, res);
  const userId: String = cookies.get('ssid');
  const SALT_WORK_FACTOR: number = 10;

  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        SQLquery = `SELECT * FROM "${process.env.PG_TABLE_CLOUD}" WHERE user_id = ${userId};`;
        const cloudDataFull = await db.query(SQLquery);
        const cloud: String[] = cloudDataFull.rows;
        return res.status(200).json({ success: true, cloud });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        console.log('Error in servers GET', err);
        return res.status(400).json({ success: false });
      }

    case 'POST':
      try {
        const { name, endpoint, password, port }: ServerInterface = req.body;
        const encryptedPassword = CryptoJS.AES.encrypt(
          password,
          process.env.SECRET_PHRASE
        ).toString();

        const decrypt = CryptoJS.AES.decrypt(
          encryptedPassword,
          process.env.SECRET_PHRASE
        );

        const decryptedPW = decrypt.toString(CryptoJS.enc.Utf8);
        console.log({ encryptedPassword, decrypt, decryptedPW });

        hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
        SQLquery += `INSERT INTO "${process.env.PG_TABLE_CLOUD}" (name,endpoint,port,password,user_id)
          VALUES ('${name}','${endpoint}',${port},'${hashedPassword}',${userId}); \n`;

        SQLquery += `INSERT INTO "${process.env.PG_TABLE_REDIS}" (user_id,endpoint,password)
          VALUES (${userId},'${endpoint}','${encryptedPassword}');`;

        await db.query(SQLquery);

        return res.status(200).json({ success: true });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        console.log('Error in servers POST', err);

        return res.status(400).json({ success: false });
      }

    case 'DELETE':
      try {
        const { name } = req.body;

        SQLquery = `DELETE FROM "${process.env.PG_TABLE_REDIS}" WHERE endpoint = (SELECT endpoint FROM "${process.env.PG_TABLE_CLOUD}" WHERE name = '${name}' AND user_id = ${userId}); \n`;

        SQLquery += `DELETE FROM "${process.env.PG_TABLE_METRICS}" WHERE user_id = '${userId}' AND server_id = (SELECT id FROM "${process.env.PG_TABLE_CLOUD}" WHERE name = '${name}' AND user_id = ${userId}); \n`;

        SQLquery += `DELETE FROM "${process.env.PG_TABLE_CLOUD}" WHERE name = '${name}' AND user_id = ${userId};`;

        await db.query(SQLquery);
        return res.status(200).json({ success: true });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        console.log('Error in servers DELETE', err);

        return res.status(400).json({ success: false });
      }
    default:
      return res.status(400).json({ success: false, error: 'Invalid request' });
  }
};
export default servers;
