const axios = require('axios');

test('No errors, prints hello world', () => {
    axios.post('http://localhost:3000/code-executor', {
        "code": "print('hello world!')"
    })
        .then(function (response) {
            const output = response.data.output;
            expect(output).toBe('hello world!');
        })
        .catch(error => {

        })

});

test('No errors, addition, no print statements', () => {
    axios.post('http://localhost:3000/code-executor', {
        "code": "1 + 1"
    })
        .then(function (response) {
            const output = response.data.output;
            expect(output).toBe('2');
        })
        .catch(error => {

        })
});


test('Errors, no semicolon to separate', () => {
    axios.post('http://localhost:3000/code-executor', {
        "code": "answer = 1 + 1\n print(answer)"
    })
        .then(function (response) {
            const output = response.data.output;
            expect(output).toBe();
        })
        .catch(error => {

        })
});

