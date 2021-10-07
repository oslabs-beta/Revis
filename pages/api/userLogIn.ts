import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../models/Revis';

const bcrypt = require('bcryptjs');

const userLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  let username: string | string[];
  let password: string | string[];
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
        return res.status(200).json( username);
      } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false, error: `${err}` });
      }
  }
};
export default userLogin;
