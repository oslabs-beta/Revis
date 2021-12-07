import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import { Redis } from 'ioredis';
import { getDate } from '../../functions/globalFunctions';
import { Metrics, ParsedBodyRedis } from '../../context/interfaces';

const RedisIO = require('ioredis');

// this object is for the front end:

const parseMetrics = async (
  metricData: string[],
  endpoint: string,
  metricDate: string,
  userID: number,
  redisStorage: Redis
) => {
  const metricsUpdated: Metrics = {
    time: '',
    total_net_output_bytes: '',
    used_memory: '',
    connected_clients: '',
    evicted_keys: '',
    keyspace_hits: '',
    keyspace_misses: '',
    total_net_input_bytes: '',
    uptime_in_seconds: '',
    client_longest_output_list: '',
    client_biggest_input_buf: '',
    blocked_clients: '',
    used_memory_rss: '',
    used_memory_peak: '',
    total_connections_received: '',
    total_commands_processed: '',
    instantaneous_ops_per_sec: '',
    instantaneous_input_kbps: '',
    instantaneous_output_kbps: '',
    rejected_connections: '',
    total_error_replies: '',
    used_cpu_sys: '',
    used_cpu_user: '',
    used_cpu_sys_children: '',
    used_cpu_user_children: '',
    used_cpu_sys_main_thread: '',
    used_cpu_user_main_thread: '',
  };
  for await (const metric of metricData) {
    let [metricName, metricValue] = metric.split(':');
    if (metricValue !== undefined) {
      if (metricName in metricsUpdated) {
        if (metricName === 'time') {
          metricValue = metricValue.replace(/-/g, ':').trim();
        }
        const redisStorageKey = `${endpoint}|${metricDate}|${userID}|${metricName}`;

        await redisStorage.rpush(redisStorageKey, metricValue);

        metricsUpdated[metricName] = metricValue;
      }
    }
  }

  redisStorage.quit();
  return metricsUpdated;
};

const redisAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method }: { method?: string } = req;
  const cookies: Cookies = new Cookies(req, res);
  const userID = Number(cookies.get('ssid'));

  const redisStorage = new RedisIO({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    connectTimeout: 10000,
    reconnectOnError: false,
  });

  switch (method) {
    case 'POST':
      try {
        const parsedBody: ParsedBodyRedis = JSON.parse(req.body);
        const { endpoint, password, port } = parsedBody;

        if (endpoint !== '' && password !== '' && port !== '') {
          const redis = new RedisIO({
            host: endpoint,
            port,
            password,
            connectTimeout: 10000,
            reconnectOnError: false,
          });

          const metrics: string = await redis.info();
          const splitMetrics: string[] = metrics.split('\r\n');
          const today = new Date();
          const metricDate: string = getDate(today);
          const updatedSeconds =
            today.getSeconds().toString().length === 1
              ? `0${today.getSeconds()}`
              : today.getSeconds();
          const updatedMinutes =
            today.getMinutes().toString().length === 1
              ? `0${today.getMinutes()}`
              : today.getMinutes();
          const updatedHours =
            today.getHours().toString().length === 1
              ? `0${today.getHours()}`
              : today.getHours();
          const time = `${updatedHours}-${updatedMinutes}-${updatedSeconds}`;

          splitMetrics.push(`time: ${time}`);
          const metricsUpdated = await parseMetrics(
            splitMetrics,
            endpoint,
            metricDate,
            userID,
            redisStorage
          );

          redis.quit();

          // Store all new data in Redis, only send updated to front end, only store most recent in global state
          return res.status(200).json({ metricsUpdated });
        }
        throw Error(
          'Error in redis. No password, username, and/or endpoint provided.'
        );
      } catch (err) {
        console.log('Error in redis', err);
        return res.status(401).send('Unable to get metrics from Redis server');
      }
    default:
      return res.status(400).send('Error in api/redis');
  }
};

export default redisAPI;
