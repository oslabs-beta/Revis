import { NextApiRequest, NextApiResponse } from 'next';
import { ParsedBodyRedis } from '../../context/interfaces';

const Redis = require('ioredis');

const verifyEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  let redis;
  switch (method) {
    case 'POST':
      try {
        const parsedBody: ParsedBodyRedis = JSON.parse(req.body);
        const { endpoint, password, port } = parsedBody;
        if (!(endpoint && password && port))
          throw Error('Endpoint, password, and port required.');
        redis = await new Redis({
          host: endpoint,
          port,
          password,
          maxRetriesPerRequest: 0,
          lazyConnect: true,
          connectTimeOut: 1,
          disconnectTimeOut: 1,
        });

        await redis.ping();
        await redis.disconnect();

        return res.status(200).json({ success: true });
      } catch (err) {
        await redis.disconnect();
        console.log('Error in validateEndpoint POST ', err);
        return res.status(400).json({ success: false });
      }
    default:
      return res.status(400).json({ error: 'Error within verifyEndpoint' });
  }
};

export default verifyEndpoint;
