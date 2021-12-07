import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');

const validateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method }: { method?: string } = req;
  const cookies: Cookies = new Cookies(req, res);
  const username: string = cookies.get('username');
  const userID: string = cookies.get('ssid');
  const SALT_WORK_FACTOR: number = 10;

  switch (method) {
    case 'GET':
      try {
        const ssid: string = cookies.get('ssid');
        return res.status(200).json({ username, ssid });
      } catch (err) {
        console.log('Error in validateUser GET ', err);
        return res.status(400).json({ success: 'false' });
      }
    case 'POST':
      try {
        const { endpoint }: { endpoint: string } = JSON.parse(req.body);
        const sessionCookie: string = cookies.get('session');
        if (!sessionCookie)
          throw Error('Invalid session token. Please log in to view servers.');

        const SQLquery = `SELECT id,lastcalled, ta.user_id, previouslycalled, tb.password as password 
        FROM "${process.env.PG_TABLE_CLOUD}" AS ta INNER JOIN "${process.env.PG_TABLE_REDIS}" AS tb on 
        ta.endpoint = tb.endpoint AND 
        ta.endpoint = '${endpoint}' WHERE ta.user_id = ${userID};`;

        const { rows } = await db.query(SQLquery);
        const {
          id,
          password,
          lastcalled,
          previouslycalled,
        }: {
          id: string;
          password: string;
          lastcalled: Date;
          previouslycalled: boolean;
        } = rows[0];

        const decryptedBytes = CryptoJS.AES.decrypt(
          password,
          process.env.SECRET_PHRASE
        ).toString(CryptoJS.enc.Utf8);

        const decryptedPW =
          password || decryptedBytes.toString(CryptoJS.enc.Utf8);

        const sessionID = bcrypt.hashSync(`${Date.now()}`, SALT_WORK_FACTOR);
        console.log({ decryptedPW, decryptedBytes });
        const token = jwt.sign({ password: '' }, process.env.token_key, {
          expiresIn: '2h',
        });
        const ONE_HOUR = 1000 * 60 * 60;
        cookies.set('session', sessionID, { httpOnly: true, maxAge: ONE_HOUR });
        cookies.set('lastCalled', lastcalled, { httpOnly: true });
        cookies.set('previouslyCalled', `${previouslycalled}`, {
          httpOnly: true,
        });
        cookies.set('serverID', id, { httpOnly: true });
        return res.status(200).json({ token });
      } catch (err) {
        console.log('Error in validateUser POST ', err);
        return res.status(400).json({ success: false });
      }
    default:
      return res.status(500).json('Server Error in validateUser');
  }
};
export default validateUser;
