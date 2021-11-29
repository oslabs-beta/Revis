import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

const signOut = async (req: NextApiRequest, res: NextApiResponse) => {
	const cookies: Cookies = new Cookies(req, res);

	const cookieNameList = [
		'username',
		'ssid',
		'session',
		'serverID',
		'previouslyCalled',
		'lastCalled',
	];
	cookieNameList.forEach((cookie: Cookies) => {
		cookies.set(cookie, null);
	});

	return res.status(200).json({ success: true });
};
export default signOut;
