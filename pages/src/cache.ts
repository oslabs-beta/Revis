// import { redis } from './redis';

// //Redis Cache setup in Redis Enterprise

// //fetch from Redis,
// const fetch = async <T>(
//   key: string,
//   expensiveComputation: () => T,
//   expires: number
// ) => {
//   const existingCache = await get<T>(key);
//   if (existingCache !== null) return existingCache;
//   else return await set(key, expensiveComputation, expires);
// };

// //get cached value from Redis
// const get = async <T>(key: string): Promise<T> => {
//   const value = await redis.get(key);
//   if (value === null) return null;
//   return JSON.parse(value);
// };

// //set the cache inside of Redis here
// const set = async <T>(
//   key: string,
//   expensiveComputation: () => T,
//   expires: number
// ) => {
//   const value = await expensiveComputation();
//   await redis.set(key, JSON.stringify(value));
//   return value;
// };

// export default { fetch, set };