const Redis = require('ioredis');
const useStore = require('../../context/Provider');

export default async (req, res) => {
  const redis = new Redis({
    host: process.env.REDIS_URL,
    port: 18891,
    password: process.env.REDIS_PW ,
  });

  redis.on('ready', async () => {
    const theping = await redis.ping();
    console.log(theping);
  });

  async function creatingMetricsObject() {
    let memory = await redis.info('memory');
    memory = memory.split('\r\n');
   
    const objWithMetrics = {};
    memory.forEach((el) => {
      const keysAndValues = el.split(':');
      objWithMetrics[keysAndValues[0]] = keysAndValues[1];
    });
    
    return objWithMetrics;
  }

  let method = req.method;

  switch (method) {
    case 'GET':
      try {
        // console.log('this is working')
        const metricsUpdated = await creatingMetricsObject();
        console.log(metricsUpdated)
        res.status(200).send(metricsUpdated);
      } catch {
        console.log('error in getting metrics');
      }
  }
};
