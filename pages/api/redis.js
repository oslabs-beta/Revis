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

      if (metricsUpdated.hasOwnProperty(keysAndValues[0])) {
        metricsUpdated[keysAndValues[0]] = keysAndValues[1];
      }
    });

    if (data)
      await redis.quit(() => {
        console.log('exited redis server');
      });
  }

  await creatingMetricsObject();

  const { method } = req;
  switch (method) {
    case 'GET': {
      try {
        await creatingMetricsObject();
        return res.status(200).json(metricsUpdated);
      } catch (err) {
        console.log('error in getting metrics');
        return res.status(400).json({ success: false, error: err });
      }
    }
    default: {
      return res
        .status(400)
        .json({ success: false, error: 'Error at redis.js Switch' });
    }
  }
};

export default metrics;
