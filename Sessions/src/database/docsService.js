const {default: axios} = require("axios");

const DOCS_SERVICE_URL = process.env.DOCS_SERVICE_URL;

const config = {
  headers: {
      "Content-Type": "application/x-www-form-urlencoded",
  }
}

function createDoc(userId, docText, docTitle) {
  const params = new URLSearchParams();
  params.append('userId', userId);
  params.append('docText', docText);
  params.append('docTitle', docTitle);

  return axios.post(`${DOCS_SERVICE_URL}/createDoc`, params, config);
}

function getDoc(docId) {
  return axios.get(`${DOCS_SERVICE_URL}/getDoc/${docId}`, config);
}

function getUserDocs(userId) {
  return axios.get(`${DOCS_SERVICE_URL}/getUserDocs/${userId}`, config); 
}

function patchDocText(docId, docText) {
  const params = new URLSearchParams();
  params.append('docText', docText); 
  return axios.patch(`${DOCS_SERVICE_URL}/patchDocText/${docId}`, params, config);
}

module.exports = {
  createDoc,
  getDoc,
  getUserDocs,
  patchDocText
}