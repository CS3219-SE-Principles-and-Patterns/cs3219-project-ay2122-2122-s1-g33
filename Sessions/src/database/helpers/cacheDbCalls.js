const { getRedisClient } = require("../redisClient");

async function getDocDataFromCache(id) {
  const redisClient = await getRedisClient();
  const allData = await redisClient.hGetAll(id);
  if (Object.keys(allData).length === 0) {
    return null;
  }
  return allData;
}

async function setCodeDocStr(id, data) {
  const redisClient = await getRedisClient();
  return redisClient.hSet(id, "docData", data);
}

async function setCodeExecutorOutput(id, data) {
  const redisClient = await getRedisClient();
  return redisClient.hSet(id, "codeExecOutput", data);
}

async function deleteDocDataFromCache(id) {
  const redisClient = await getRedisClient();
  redisClient.del(id);
}

async function getCodeExecutionStatus(id) {
  const redisClient = await getRedisClient();
  const status = await redisClient.hGet(id, "isCodeExecRunning");
  return Boolean(status);
}
async function setCodeExecutionStatus(id, status) {
  const redisClient = await getRedisClient();
  redisClient.hSet(id, "isCodeExecRunning", status);
}

module.exports = { getDocDataFromCache, setCodeDocStr, setCodeExecutorOutput, deleteDocDataFromCache, getCodeExecutionStatus, setCodeExecutionStatus };
