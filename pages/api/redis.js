const Redis = require('ioredis');
const useStore = require('../../context/Provider');

export default async (req, res) => {
  const metricsToEvaluate = [
    'total_net_output_bytes',
    'used_memory',
    'connected_clients',
    'evicted_keys',
    'keyspace_hits',
    'keyspace_misses',
    'total_net_input_bytes',
    'uptime_in_seconds', // how long you've been at the server for
  ];
  const redis = new Redis({
    host: process.env.REDIS_URL,
    port: 16424,
    password: process.env.REDIS_PW,
  });

  redis.on('ready', async () => {
    const theping = await redis.ping();
    console.log(theping);
  });

  async function creatingMetricsObject() {
    let memory = await redis.info();

    memory = memory.split('\r\n');

    const objWithMetrics = {};
    memory.forEach((el) => {
      const keysAndValues = el.split(':');
      if (metricsToEvaluate.includes(keysAndValues[0]))
        objWithMetrics[keysAndValues[0]] = keysAndValues[1];
    });

    return objWithMetrics;
  }

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // console.log('this is working')
        const metricsUpdated = await creatingMetricsObject();
        console.log(metricsUpdated);
        res.status(200).send(metricsUpdated);
      } catch {
        console.log('error in getting metrics');
      }
  }
};
