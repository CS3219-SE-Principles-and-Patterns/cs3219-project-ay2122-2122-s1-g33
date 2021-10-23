require('dotenv-safe').config();
const {getRedisClient} = require("./database/redisClient");

getRedisClient()
.then(() => {
  require("./server/io")
})
