import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';

const deleteServer = async (req: NextApiRequest, res: NextApiResponse) => {
  let SQLquery: string;
  type Server = {
    name: string;
    IP: string;
    PORT: string;
    endPoint: string;
    password: string;
  };

  const parsedBody: Server = JSON.parse(req.body);

  const { name, endPoint, password } = parsedBody;

  try {
    const cookies: Cookies = new Cookies(req, res);
    const userId: String = cookies.get('ssid');
    if (endPoint && password) {
      SQLquery = `DELETE FROM "serverCloud" WHERE servername = '${name}' AND user_id = ${userId};`;
    } else {
      SQLquery = `DELETE FROM "serverLocal" where servername = '${name}' AND user_id = ${userId};`;
    }

    await db.query(SQLquery);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(`FAILED QUERY ${SQLquery}`);
    return res.status(400).json({ success: false, error: err });
  }
};
export default deleteServer;
