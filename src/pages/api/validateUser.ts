import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';

const validateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method }: { method?: string } = req;
  const cookies: Cookies = new Cookies(req, res);
  const username: string = cookies.get('username');
  const userID: string = cookies.get('ssid');
  switch (method) {
    case 'GET':
      try {
        const ssid: string = cookies.get('ssid');
        return res.status(200).json({ username, ssid });
      } catch (err) {
        return res.status(400).send('Error in validateUser');
      }
    case 'POST':
      try {
        const parsedBody = JSON.parse(req.body);
        const { endpoint }: { endpoint: string } = parsedBody;
        const sessionCookie: string = cookies.get('session');
        let SQLquery: string = `SELECT session FROM "${process.env.PG_TABLE_USERS}" where username = '${username}';`;
        let { rows } = await db.query(SQLquery);
        const { session }: { session: string } = rows[0];
        if (session !== sessionCookie)
          throw Error('Invalid session token. Please log in to view servers.');

        SQLquery = `SELECT id,lastcalled, ta.user_id, previouslycalled, tb.password as password 
        FROM "${process.env.PG_TABLE_CLOUD}" AS ta INNER JOIN "${process.env.PG_TABLE_REDIS}" AS tb on 
        ta.endpoint = tb.endpoint AND 
        ta.endpoint = '${endpoint}' WHERE ta.user_id = ${userID};`;

        ({ rows } = await db.query(SQLquery));
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

        cookies.set('lastCalled', lastcalled, { httpOnly: true });
        cookies.set('previouslyCalled', `${previouslycalled}`, {
          httpOnly: true,
        });
        cookies.set('serverID', id, { httpOnly: true });
        return res.status(200).json({ password });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
      }
    default:
      return res.status(500).json('Server Error in validateUser');
  }
};
export default validateUser;
