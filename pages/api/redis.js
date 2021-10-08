const Redis = require('ioredis');

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
const metrics = async (req, res) => {
  // how long you've been at the server for

  async function creatingMetricsObject() {
    const redis = new Redis({
      host: process.env.REDIS_URL,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PW,
    });

    let data = await redis.info();
    // we receive the information from redis in a string so we split it
    data = data.split('\r\n');

    data.forEach((el) => {
      // we split it again to find the keys and values of each line
      const keysAndValues = el.split(':');

      if (metricsToEvaluate.hasOwnProperty(keysAndValues[0])) {
        metricsToEvaluate[keysAndValues[0]].push(keysAndValues[1]);
        metricsUpdated[keysAndValues[0]] = keysAndValues[1];
      }
    });
    res.json(metricsToEvaluate);
    if (data)
      await redis.quit(() => {
        // console.log('exited redis server');
      });
  }

  await creatingMetricsObject();
  // we need to set an interval to save the info from redis every 10 seconds in the object
  setTimeout(() => {
    creatingMetricsObject();
  }, 100000);

  // when we receive a get request we don't need to fetch from redis, we use our object

  try {
    res.status(200).json(metricsUpdated);
  } catch {
    console.log('error in getting metrics');
  }
};

export default metrics;
