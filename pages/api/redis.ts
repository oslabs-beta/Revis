import { NextApiRequest, NextApiResponse } from 'next';

const Redis = require('ioredis');

const metrics = async (req: NextApiRequest, res: NextApiResponse) => {
  // this object is for the front end:
  const metricsUpdated = {
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
  const metricsToEvaluate = {
    total_net_output_bytes: [],
    used_memory: [],
    connected_clients: [],
    evicted_keys: [],
    keyspace_hits: [],
    keyspace_misses: [],
    total_net_input_bytes: [],
    uptime_in_seconds: [],
  };
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const parsedBody = JSON.parse(req.body);
        const { endpoint, password, port } = parsedBody;
        const redis = new Redis({
          host: endpoint,
          port,
          password,
        });
        const metrics = await redis.info();
        const splitMetrics = metrics.split('\r\n');
        splitMetrics.forEach((el) => {
          // we split it again to find the keys and values of each line
          const keysAndValues = el.split(':');
          if (metricsToEvaluate.hasOwnProperty(keysAndValues[0])) {
            metricsToEvaluate[keysAndValues[0]].push(keysAndValues[1]);
            metricsUpdated[keysAndValues[0]] = keysAndValues[1];
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

export default metrics;
