import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

const signOut = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies: Cookies = new Cookies(req, res);
  cookies.set('username', null);
  cookies.set('ssid', null);
  cookies.set('session', null);
  cookies.set('serverID', null);
  cookies.set('previouslyCalled', null);
  cookies.set('lastCalled', null);
  return res.status(200).json({ success: true });
};
export default signOut;
