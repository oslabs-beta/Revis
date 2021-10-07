const Redis = require('ioredis');

// redis.on('ready', async () => {
//   const theping = await redis.ping();
//   console.log(theping);
// });

// async function creatingMetricsObject() {
//   const redis = new Redis({
//     host: process.env.REDIS_URL,
//     port: 18891,
//     password: process.env.REDIS_PW,
//   });
//   let memory = await redis.info('memory');
//   memory = memory.split('\r\n');

//   const objWithMetrics = {};
//   memory.forEach((el) => {
//     const keysAndValues = el.split(':');
//     objWithMetrics[keysAndValues[0]] = keysAndValues[1];
//   });

//   return objWithMetrics;
// }

// export default creatingMetricsObject;
