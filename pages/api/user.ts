import db from '../../models/Revis';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const SQLquery: string = 'SELECT * FROM PUBLIC.USERS';
        const result = await db.query(SQLquery);
        res.status(200).json(result);
      } catch (err) {
        console.log('no');
      }
  }
};
