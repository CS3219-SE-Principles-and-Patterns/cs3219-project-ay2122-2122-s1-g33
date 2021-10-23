const { default: axios } = require("axios");

const CODE_EXECUTOR_URL = process.env.CODE_EXECUTOR_URL

async function executeCode(code) {
  return axios.post(`${CODE_EXECUTOR_URL}/code-executor`, { code });
}

module.exports = executeCode;
