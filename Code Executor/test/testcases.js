const axios = require('axios');

axios.post('http://localhost:3000/code-executor', {
    "code": "print('hello world!')"
})
    .then(function (response) {
        const output = response.data.output;
        console.log(output)
    })

axios.post('http://localhost:3000/code-executor', {
    "code": "answer = 1 + 1; print(answer)"
})
    .then(function (response) {
        const output = response.data.output;
        console.log(output)
    })
