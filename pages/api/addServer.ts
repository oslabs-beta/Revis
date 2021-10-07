import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../models/Revis';

const bcrypt = require('bcryptjs');

const addServer = async (req: NextApiRequest, res: NextApiResponse) => {
  let hashedPassword: string;
  let SQLquery: string;
  type Server = {
    name: string;
    IP: string;
    PORT: string;
    username: string;
    endPoint: string;
    password: string;
  };

  const parsedBody: Server = JSON.parse(req.body);

  const { name, IP, PORT, username, endPoint, password } = parsedBody;

  try {
    if (endPoint && password) {
      hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
      SQLquery = `INSERT INTO "serverCloud" (username,serverName,endpoint,password)
         VALUES ('${username}','${name}','${endPoint}','${hashedPassword}');`;
    } else {
      SQLquery = `INSERT INTO "serverLocal" (username,serverName,ip,port)
         VALUES ('${username}','${name}','${IP}','${PORT}');`;
    }

    await db.query(SQLquery);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(`FAILED QUERY ${SQLquery}`);
    return res.status(400).json({ success: false, error: err });
  }
};
export default addServer;
