import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../models/Revis';

const bcrypt = require('bcryptjs');

const addServer = async (req: NextApiRequest, res: NextApiResponse) => {
  let method: string;
  let hashedPassword: string;
  type Server = {
    name: string;
    IP: string;
    PORT: string;
  };

  const parsedBody = JSON.parse(req.body);
  name = parsedBody.username;
  IP = parsedBody.password;
  PORT = parsedBody.email;

  const SALT_WORK_FACTOR: number = 10;
  method = req.method;

  switch (method) {
    case 'POST':
      try {
        console.log(username, password, email);
        hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
        const SQLquery: string = `INSERT INTO PUBLIC.USERS (username,password,email)
         VALUES ('${username}','${hashedPassword}','${email}');`;
        await db.query(SQLquery);

        return res.status(200).json({ success: true });
      } catch (err) {
        console.log(err);
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
              error:
                'This email is already taken. Please provide a unique email.',
            });

          default:
            return false;
        }
      }
    default:
      return false;
  }
};
export default addServer;
