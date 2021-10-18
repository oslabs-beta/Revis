import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';

const validateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method }: { method?: string } = req;
  const cookies: Cookies = new Cookies(req, res);
  const username: string = cookies.get('username');
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
        let SQLquery: string = `SELECT session FROM PUBLIC.USERS where username = '${username}';`;
        let { rows } = await db.query(SQLquery);
        const { session }: string = rows[0];
        console.log(session, sessionCookie);
        if (session !== sessionCookie)
          throw Error('Invalid session token. Please log in to view servers.');

        SQLquery = `SELECT password FROM "${process.env.PG_TABLE_REDIS}" where endpoint = '${endpoint}';`;
        ({ rows } = await db.query(SQLquery));
        const password: string = rows[0];
        return res.status(200).json(password);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
      }
    default:
      return res.status(500).json('Server Error in validateUser');
  }
};
export default validateUser;
