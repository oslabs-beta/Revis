import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

const validateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies: Cookies = new Cookies(req, res);
  const username: string = cookies.get('username');
  const ssid: string = cookies.get('ssid');
  return res.status(200).json({ username, ssid });
};
export default validateUser;
