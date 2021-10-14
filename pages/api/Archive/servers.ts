import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import db from "../../models/Revis";

const bcrypt = require("bcryptjs");

const servers = async (req: NextApiRequest, res: NextApiResponse) => {
  let hashedPassword: string;
  let SQLquery: string;
  let SQLqueryCloud: string;
  let SQLqueryLocal: string;
  type Server = {
    name: string;
    IP: string;
    PORT: string;
    endpoint: string;
    password: string;
  };

  const cookies: Cookies = new Cookies(req, res);
<<<<<<< HEAD:pages/api/servers_Endpoint.ts
  const userId: String = cookies.get("ssid");
  const SALT_WORK_FACTOR: number = 10;
=======
  const userId: String = cookies.get('ssid');
>>>>>>> dc574079b48d500cb156d205ee67283e7b694cb8:pages/api/Archive/servers.ts

  const { method } = req;
  switch (method) {
    case "GET":
      try {
        SQLqueryCloud = `SELECT name,endpoint FROM "serverCloud" WHERE user_id = ${userId};`;
        SQLqueryLocal = `SELECT name,ip,port FROM "serverLocal" WHERE user_id = ${userId};`;

        const cloudDataFull = await db.query(SQLqueryCloud);
        const cloud: String[] = cloudDataFull.rows;
        const localDataFull = await db.query(SQLqueryLocal);
        const local: String[] = localDataFull.rows;

        return res.status(200).json({ success: true, cloud, local });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        return res.status(400).json({ success: false, error: err });
      }

    case "POST":
      try {
        const parsedBody: Server = JSON.parse(req.body);
        const { name, IP, PORT, endpoint, password } = parsedBody;

        if (endpoint && password) {
          hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
          SQLquery = `INSERT INTO "serverCloud" (name,endpoint,password,user_id)
                 VALUES ('${name}','${endpoint}','${hashedPassword}',${userId});`;
        } else {
          SQLquery = `INSERT INTO "serverLocal" (name,IP,PORT,user_id)
                 VALUES ('${name}','${IP}','${PORT}',${userId});`;
        }
        await db.query(SQLquery);

        return res.status(200).json({ success: true });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        return res.status(400).json({ success: false, error: err });
      }
<<<<<<< HEAD:pages/api/servers_Endpoint.ts

    case "DELETE":
=======
    case 'DELETE':
>>>>>>> dc574079b48d500cb156d205ee67283e7b694cb8:pages/api/Archive/servers.ts
      try {
        const parsedBody: Server = JSON.parse(req.body);
        const { name, endpoint, password } = parsedBody;

        SQLquery = `DELETE FROM "serverCloud" WHERE name = '${name}' AND user_id = ${userId};`;

        await db.query(SQLquery);

        return res.status(200).json({ success: true });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        return res.status(400).json({ success: false, error: err });
      }
    default:
      return res.status(400).json({ success: false, error: "Invalid request" });
  }
};
export default servers;
