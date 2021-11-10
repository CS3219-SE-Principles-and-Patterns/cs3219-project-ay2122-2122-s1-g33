const {createClient} = require("redis");

let redisClient;
async function getRedisClient() {
  if (redisClient) {
    return redisClient;
  }
  const client = createClient({
    password: process.env.SESSIONS_CACHE_REDIS_PASSWORD,
    socket: {
      host: process.env.SESSIONS_CACHE_REDIS_DB_ADDR,
      port: process.env.SESSIONS_CACHE_REDIS_PORT      
    }
  });
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  redisClient = client;
  return redisClient;
}

module.exports = {getRedisClient};
