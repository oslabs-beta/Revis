const Redis = require('ioredis');
const useStore = require('../../context/Provider');

// export default async (req, res) => {
// const redis = new Redis({
//   host: process.env.REDIS_URL,
//   port: 18891,
//   password: process.env.REDIS_PW,
// });
// redis.on('ready', async () => {
//   const theping = await redis.ping();
//   if (theping === 'PONG') console.log('Çonnected to Redis');
// });
// async function creatingMetricsObject() {
//   let memory = await redis.info('memory');
//   memory = memory.split('\r\n');
//   const objWithMetrics = {};
//   memory.forEach((el) => {
//     const keysAndValues = el.split(':');
//     objWithMetrics[keysAndValues[0]] = keysAndValues[1];
//   });
//   return objWithMetrics;
// }
// const { method } = req;
// switch (method) {
//   case 'GET':
//     try {
//       const metricsUpdated = await creatingMetricsObject();
//       res.status(200).send(metricsUpdated);
//     } catch {
//       console.log('error in getting metrics');
//     }
// }
// };
