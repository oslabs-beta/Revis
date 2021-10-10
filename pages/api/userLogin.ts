import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';
import { User } from '../../interfaces';

const bcrypt = require('bcryptjs');

const userLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsedBody = JSON.parse(req.body);
  const { username }: { username: string | string[] } = parsedBody;
  const { password }: { password: string | string[] } = parsedBody;

  res.setHeader('Content-Type', 'application/json');
  try {
    const cookies: Cookies = new Cookies(req, res);
    const SQLquery: string = `SELECT * FROM PUBLIC.USERS where username = '${username}';`;
    const { rows } = await db.query(SQLquery);
    const userData: User = rows[0];
    const hashedPassword: string = userData.password;
    const compare: boolean = bcrypt.compareSync(password, hashedPassword);
    if (!compare)
      throw Error('Incorrect username or password. Please try again.');
    console.log(`User: ${username} logged in`);
    cookies.set('ssid', `${userData.user_id}`);
    return res.status(200).json(username);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, error: `${err}` });
  }
};
export default userLogin;
