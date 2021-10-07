const Redis = require('ioredis');
const useStore = require('../../context/Provider');

export default async (req, res) => {
  const redis = new Redis({
    host: 'redis-18891.c9.us-east-1-4.ec2.cloud.redislabs.com',
    port: 18891,
    password: 'Etttmq5T4ubqnE6TaYltcjXmdobQAjfq',
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
        console.log('metrics were updated at the back end');
        res.status(200).json(metricsUpdated);
      } catch {
        console.log('error in getting metrics');
      }
  }
};
