import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';
// import { parseBody } from 'next/dist/server/api-utils';

const bcrypt = require('bcryptjs');

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  let hashedPassword: string;

  const parsedBody = JSON.parse(req.body);
  const { username }: { username: string | string[] } = parsedBody;
  const { password }: { password: string | string[] } = parsedBody;
  const { email }: { email: string | string[] } = parsedBody;

  const SALT_WORK_FACTOR: number = 10;
  try {
    const cookies: Cookies = new Cookies(req, res);
    hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
    const SQLquery: string = `INSERT INTO PUBLIC.USERS (username,password,email)
         VALUES ('${username}','${hashedPassword}','${email}')
         RETURNING user_id;`;
    const userId = await db.query(SQLquery);

    cookies.set('ssid', `${userId}`);
    return res.status(200).json({ success: true });
  } catch (err) {
    // console.log(err);
    const { constraint }: { constraint: string } = err;
    switch (constraint) {
      case 'users_username_key':
        return res.status(400).json({
          success: false,
          error:
            'This username is already taken. Please provide a unique username.',
        });

      case 'users_email_key':
        return res.status(400).json({
          success: false,
          error: 'This email is already taken. Please provide a unique email.',
        });

      default:
        return false;
    }
  }
};
export default createUser;
