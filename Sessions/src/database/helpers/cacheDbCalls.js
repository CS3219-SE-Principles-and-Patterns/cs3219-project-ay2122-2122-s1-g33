const { patchDocText } = require("../docsService");
const { getRedisClient } = require("../redisClient");

const DOCS_SAVE_INTERVAL = 3 * 1000; // 3s

async function getDocDataFromCache(id) {
  const redisClient = await getRedisClient();
  const allData = await redisClient.hGetAll(id);
  if (Object.keys(allData).length === 0) {
    return null;
  }
  return {...allData, isCodeExecRunning: convertIntStatusToBool(allData.isCodeExecRunning)};
}

async function setCodeDocStr(id, data) {
  const redisClient = await getRedisClient();
  const response = await redisClient.hSet(id, "docData", data);
  const lastSaved = await getRoomLastSaved(id)
  if (lastSaved < Date.now() - DOCS_SAVE_INTERVAL) {
    await patchDocText(id, data);
  }
  return updateRoomDocLastSaved(id);
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
  return convertIntStatusToBool(status);
}

async function setCodeExecutionStatus(id, status) {
  const redisClient = await getRedisClient();
  await redisClient.hSet(id, "isCodeExecRunning", convertBoolStatusToInt(status));
}

async function updateRoomDocLastSaved(id) {
  const redisClient = await getRedisClient();
  await redisClient.hSet(id, "lastSaved", `${Date.now()}`);
}

async function getRoomLastSaved(id) {
  const redisClient = await getRedisClient();
  const str = redisClient.hGet(id, "lastSaved");
  return Number(str);
}

async function incrCountOfRoom(id) {
  const redisClient = await getRedisClient();
  const key = getRoomCountKey(id);
  return redisClient.incr(key);
}

async function decrCountOfRoom(id) {
  const redisClient = await getRedisClient();
  const key = getRoomCountKey(id);
  return redisClient.decr(key);
}

async function getCountForRoom(id) {
  const redisClient = await getRedisClient();
  const key = getRoomCountKey(id);
  return redisClient.get(key);
}

function getRoomCountKey(id) {
  return `socket-room-member-count-${id}`;
}

function convertBoolStatusToInt(status) {
  return status ? "1" : "0";
}

function convertIntStatusToBool(status) {
  return status === "1" ? true : false;
}

module.exports = { 
  getDocDataFromCache,
  setCodeDocStr,
  setCodeExecutorOutput,
  deleteDocDataFromCache,
  getCodeExecutionStatus,
  setCodeExecutionStatus,
  updateRoomDocLastSaved,
  getRoomLastSaved,
  incrCountOfRoom,
  decrCountOfRoom,
  getCountForRoom
};
