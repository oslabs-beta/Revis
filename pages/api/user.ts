import db from '../../models/Revis';
import type { NextApiRequest, NextApiResponse } from 'next';
const bcrypt = require('bcryptjs');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let method: string;
  let username: string | string[];
  let password: string | string[];
  let email: string | string[];
  let hashedPassword: string;
  type User = {
    user_id: number;
    username: string;
    password: string;
    email: string;
    session: string;
  };

  const parsedBody = JSON.parse(req.body);
  username = parsedBody.username;
  password = parsedBody.password;
  email = parsedBody.email;
  const SALT_WORK_FACTOR: number = 10;
  method = req.method;

  switch (method) {
    case 'GET':
      res.setHeader('Content-Type', 'application/json');
      try {
        const SQLquery: string = `SELECT * FROM PUBLIC.USERS where username = '${username}';`;
        const { rows } = await db.query(SQLquery);
        const userData: User = rows[0];
        const hashedPassword: string = userData.password;
        const compare: boolean = bcrypt.compareSync(password, hashedPassword);
        if (!compare)
          throw Error('Incorrect username or password. Please try again.');
        console.log(`User: ${username} logged in`);
        return res.status(200).send(userData);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, error: `${err}` });
      }

    case 'POST':
      try {
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
        }
      }

    // case 'DELETE':
    //   try {
    //     const SQLquery: string = 'SELECT * FROM PUBLIC.USERS';
    //     const result = await db.query(SQLquery);
    //     res.status(200).json(result);
    //   } catch (err) {
    //     console.log(err);
    //   }

    // case 'PATCH':
    //   try {
    //     const SQLquery: string = 'SELECT * FROM PUBLIC.USERS';
    //     const result = await db.query(SQLquery);
    //     res.status(200).json(result);
    //   } catch (err) {
    //     console.log(err);
    //   }
  }
};
