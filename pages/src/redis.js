const Redis = require('ioredis');
const redis = require('redis');

const rediss = new Redis({
  host: 'localhost',
  port: 6379,
  password: '',
});

// redis.get('chao', (err, reply) => {
//   if (err) throw err;
//   console.log(reply);
// });

// redis.info((err, reply) => {
//   if (err) throw err;
//   console.log(reply);
// });

// redis.monitor((err, reply) => {
//   if (err) throw err;
//   console.log(reply);
// });
rediss.on('ready', async () => {
  const obj ={}
  const theping = await rediss.ping();
  console.log(theping);
  const memory = await rediss.info('STATS');

  console.log(memory);
});

// rediss.info((req, res) => {
//   res.split("\n").map((line) => {
//     if (line.match(/used_memory_human/)) {
//       console.log('Used memory: ' + line.split(":")[1]);
//     }
//  })
//});
// const { createClient } = require('redis');

// function redis() {

//   (async () => {
//     const client = createClient();

//     client.on('error', (err) => console.log('Redis Client Error', err));

//     await client.connect();

//     await client.set('chao', 'hello');
//     const value = await client.get('chao');
//     console.log(value);
//   })();
// }

//redis();
//connection to REDIS in the cloud
//export const redis = new Redis(process.env.REDIS_URL);

// private redisClient: RedisClient
// this.redisClient = new RedisClient({
//     port: 6379, // matches with first port # after -p above
//     host: '127.0.0.1'
// });

// The above code connects to localhost on port 6379. To connect to a different host or port, use a connection string in the format redis[s]://[[username][:password]@][host][:port][/db-number]:

// createClient({
//   url: 'redis://alice:foobared@awesome.redis.server:6380',
// });
