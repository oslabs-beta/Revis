import { NextApiRequest, NextApiResponse } from 'next';
import { Metrics, ParsedBodyRedis } from '../../context/interfaces';

const Redis = require('ioredis');

const redisAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  // this object is for the front end:
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

  const { method }: { method?: string } = req;
  switch (method) {
    case 'POST':
      try {
        const parsedBody: ParsedBodyRedis = JSON.parse(req.body);
        const { endpoint, password, port } = parsedBody;
        const redis = new Redis({
          host: endpoint,
          port,
          password,
          connectTimeout: 10000,
          reconnectOnError: false,
        });

        const metrics: string = await redis.info();
        const splitMetrics: string[] = metrics.split('\r\n');
        const today = new Date();
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
        splitMetrics[splitMetrics.length] = `time: ${time}`;
        splitMetrics.forEach((currentMetric: string) => {
          // we split it again to find the keys and values of each line
          // currentMetric format example:
          // 'used_memory:572856'
          let [metricName, metricValue] = currentMetric.split(':');
          if (metricValue !== undefined) {
            if (metricName in metricsUpdated) {
              if (metricName === 'time') {
                metricValue = metricValue.replace(/-/g, ':').trim();
              }
              metricsUpdated[metricName] = metricValue;
            }
          }
        });
        redis.quit();
        return res.status(200).json({ metricsUpdated });
      } catch (err) {
        console.log('Error in redis', err);
        return res.status(400).send('Unable to get metrics from Redis server');
      }
    default:
      return res.status(400).send('Error in api/redis');
  }
};

export default redisAPI;
