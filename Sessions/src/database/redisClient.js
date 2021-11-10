const {createClient} = require("redis");

let redisClient;
async function getRedisClient() {
  if (redisClient) {
    return redisClient;
  }
  const opts = {
    socket: {
      host: process.env.SESSIONS_CACHE_REDIS_DB_ADDR,
      port: process.env.SESSIONS_CACHE_REDIS_PORT      
    }
  }
  if (process.env.SESSIONS_CACHE_REDIS_PASSWORD) {
    opts.password = process.env.SESSIONS_CACHE_REDIS_PASSWORD;
  }
  const client = createClient(opts);
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  redisClient = client;
  return redisClient;
}

module.exports = {getRedisClient};
