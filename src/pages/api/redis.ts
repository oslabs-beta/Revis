import { NextApiRequest, NextApiResponse } from 'next';
import { MetricsList, ParsedBodyRedis } from '../../context/interfaces';

const Redis = require('ioredis');

const redisAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  // this object is for the front end:
  const metricsUpdated: MetricsList = {
    total_net_output_bytes: '',
    used_memory: '',
    connected_clients: '',
    evicted_keys: '',
    keyspace_hits: '',
    keyspace_misses: '',
    total_net_input_bytes: '',
    uptime_in_seconds: '',
  };

  // this object is for the graphs
  const metricsToEvaluate: MetricsList = {
    total_net_output_bytes: [],
    used_memory: [],
    connected_clients: [],
    evicted_keys: [],
    keyspace_hits: [],
    keyspace_misses: [],
    total_net_input_bytes: [],
    uptime_in_seconds: [],
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
        splitMetrics.forEach((currentMetric: string) => {
          // we split it again to find the keys and values of each line
          // currentMetric format example:
          // 'used_memory:572856'
          const [metricName, metricValue] = currentMetric.split(':');
          if (metricName in metricsToEvaluate) {
            metricsToEvaluate[metricName].push(metricValue);
            metricsUpdated[metricName] = metricValue;
          }
        });
        redis.quit();
        return res.status(200).json(metricsToEvaluate);
      } catch (err) {
        console.log(err);
        return res.status(400).send('Unable to get metrics from Redis server');
      }
    default:
      return res.status(400).send('Error in Endpoint');
  }
};

export default redisAPI;
