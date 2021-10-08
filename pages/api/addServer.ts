import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';

const bcrypt = require('bcryptjs');

const addServer = async (req: NextApiRequest, res: NextApiResponse) => {
  let hashedPassword: string;
  let SQLquery: string;
  type Server = {
    name: string;
    IP: string;
    PORT: string;
    endPoint: string;
    password: string;
  };

  const parsedBody: Server = JSON.parse(req.body);

  const { name, IP, PORT, endPoint, password } = parsedBody;

  try {
    const cookies: Cookies = new Cookies(req, res);
    const userId: String = cookies.get('ssid');
    if (endPoint && password) {
      hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
      SQLquery = `INSERT INTO "serverCloud" (servername,endpoint,password,user_id)
         VALUES ('${name}','${endPoint}','${hashedPassword}',${userId});`;
    } else {
      SQLquery = `INSERT INTO "serverLocal" (servername,ip,port,user_id)
         VALUES ('${name}','${IP}','${PORT}',${userId});`;
    }

    await db.query(SQLquery);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(`FAILED QUERY ${SQLquery}`);
    return res.status(400).json({ success: false, error: err });
  }
};
export default addServer;
