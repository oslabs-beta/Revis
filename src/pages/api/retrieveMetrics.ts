import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import { Metrics, metricsSQLtoRedis } from '../../context/interfaces';

const Redis = require('ioredis');

const metricList = [
  'total_net_output_bytes',
  'used_memory',
  'connected_clients',
  'evicted_keys',
  'keyspace_hits',
  'keyspace_misses',
  'total_net_input_bytes',
  'uptime_in_seconds',
];

const retrieveFromRedis = async (
  redis,
  endpoint: string,
  date: string,
  userID: number,
  name: string,
  metrics: string[]
) => {
  const redisMetrics = [];
  if (!name) {
    metrics.forEach(async (metric) => {
      const redisStorageKey = `${endpoint}|${date}|${userID}|${metric}`;
      redisMetrics.push(await redis.lrange(redisStorageKey, 0, -1));
    });
  }
  const redisMetricsObj = {};
  Promise.all(redisMetrics).then((values) => {
    console.log(values);
  });
};

const storeMetrics = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const cookies: Cookies = new Cookies(req, res);
  const userID = Number(cookies.get('ssid'));
  const today = new Date();
  const day: string = String(today.getDate());
  const month: string = String(today.getMonth() + 1);
  const year: string = String(today.getFullYear());
  const fullDate: string = `${month}-${day}-${year}`;

  switch (method) {
    case 'POST': {
      //   const parsedBody: { endpoint: string; name: string } = JSON.parse(
      //     req.body
      //   );
      const { endpoint, name } = req.body;

      const redis = new Redis({
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PW,
        connectTimeout: 10000,
        reconnectOnError: false,
      });

      retrieveFromRedis(redis, endpoint, fullDate, userID, name, metricList);

      return res.status(200).json({ test: 'test' });
    }

    default:
      return res.status(400).json({ error: 'Error within retrieveMetrics' });
  }
};
export default storeMetrics;
