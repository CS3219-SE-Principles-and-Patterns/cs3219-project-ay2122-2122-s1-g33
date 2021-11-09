const axios = require('axios');
const codeExecutor = require('../app/routes/code-executor.routes')
const fs = require('fs')
const tmp = require('tmp');

// axios.post('http://localhost:8080/code-executor', {
//     "code": "print('hello world!')"
// })
//     .then(function (response) {
//         const output = response.data.output;
//         //console.log(output)
//     })
//
// axios.post('http://localhost:8080/code-executor', {
//     "code": "answer = 1 + 1; print(answer)"
// })
//     .then(function (response) {
//         const output = response.data.output;
//         //console.log(output)
//     })
//
// axios.post('http://localhost:8080/code-executor', {
//     "code": "answer = 1 + 1\n print(answer)"
// })
//     .then(function (response) {
//         const output = response.data.output;
//         console.log(output)
//     }).catch(error => {
//         console.log(error.message)
// })
