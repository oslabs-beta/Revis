import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import { MetricsList, ParsedBodyRedis } from '../../context/interfaces';

const Redis = require('ioredis');

const redisAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies: Cookies = new Cookies(req, res);
  const ssid: string = cookies.get('ssid');
  // this object is for the front end:
  const metricsUpdated: MetricsList = {
    time: '',
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
    time: [],
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
        if (typeof req.body !== 'string')
          return res
            .status(400)
            .send('Unable to get metrics from Redis server');
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
        const dateRecorded = today.toDateString();
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
        // console.log(splitMetrics);
        splitMetrics.forEach((currentMetric: string) => {
          // we split it again to find the keys and values of each line
          // currentMetric format example:
          // 'used_memory:572856'
          const [metricName, metricValue] = currentMetric.split(':');
          if (metricValue !== undefined) {
            const metricNameUserDate = `${ssid}:${metricName}:${endpoint}:${dateRecorded}:${time}`;
            if (metricName in metricsToEvaluate) {
              metricsToEvaluate[metricName].push(metricValue);
              // } else {
              //   metricsToEvaluate[metricName] = [metricValue];
              // }
              metricsUpdated[metricName] = metricValue;
            }
            redis.rpush(metricNameUserDate, metricValue);
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
