import axios from 'axios';
const docsServerUrl = process.env.REACT_APP_DOCS_SERVER_URL;

const config = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
}

const createDoc = (userId, docText, docTitle) => {
    const params = new URLSearchParams();
    params.append('userId', userId);
    params.append('docText', docText);
    params.append('docTitle', docTitle);

    return axios.post(`${docsServerUrl}/createDoc`, params, config);
}

const getDoc = (docId) => {
    return axios.get(`${docsServerUrl}/getDoc/${docId}`, config);
}

const getUserDocs = (userId) => {
    return axios.get(`${docsServerUrl}/getUserDocs/${userId}`, config); 
}

const patchDocText = (docId, docText) => {
    const params = new URLSearchParams();
    params.append('docText', docText); 
    return axios.patch(`${docsServerUrl}/patchDocText/${docId}`, params, config);
}

const API = {
    createDoc,
    getDoc,
    getUserDocs,
    patchDocText
}

export default API;