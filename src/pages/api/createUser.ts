import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import db from '../../models/Revis';
import { User } from '../../context/interfaces';

const bcrypt = require('bcryptjs');

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
	let hashedPassword: string;

	const { username, password, email }: User = req.body;
	const SALT_WORK_FACTOR: number = 10;
	try {
		const cookies: Cookies = new Cookies(req, res);
		hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
		const SQLquery: string = `INSERT INTO "${process.env.PG_TABLE_USERS}" (username,password,email)
         VALUES ('${username}','${hashedPassword}','${email}')
         RETURNING user_id;`;
		const { rows } = await db.query(SQLquery);
		const userID: number = rows[0].user_id;

		const sessionID = bcrypt.hashSync(`${Date.now()}`, SALT_WORK_FACTOR);
		console.log(`User: ${username} logged in`);
		const ONE_HOUR = 1000 * 60 * 60;

		cookies.set('session', sessionID, { httpOnly: true, maxAge: ONE_HOUR });
		cookies.set('ssid', `${userID}`, { httpOnly: true });
		cookies.set('username', `${username}`, { httpOnly: true });
		return res.status(200).json({ success: true });
	} catch (err: any) {
		console.log('Error in createUser', err);
		return res.status(406).json({
			success: false,
			error:
				'Unable to create user. Either email or username is already taken.',
		});
	}
};

export default createUser;
