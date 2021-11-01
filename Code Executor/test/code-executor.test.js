const axios = require('axios');
const codeExecutor = require('../app/routes/code-executor.routes')
const fs = require('fs')
const tmp = require('tmp');

test('No errors, prints hello world', () => {
    const tmpobj = tmp.fileSync({ prefix: 'pycode', postfix: '.py' });
    const filePath = tmpobj.name
    fs.writeFileSync(filePath, "print('hello world!')")
    return codeExecutor.runPython(filePath).then(data => {
        expect(data).toBe('hello world!\n');
    });
});

test('No errors, addition, no print statements, no outputs', () => {
    const tmpobj = tmp.fileSync({ prefix: 'pycode', postfix: '.py' });
    const filePath = tmpobj.name
    fs.writeFileSync(filePath, "1 + 1")
    return codeExecutor.runPython(filePath).then(data => {
        expect(data).toBe('');
    });
});

test('Error, invalid indentation of newline to separate', () => {
    const tmpobj = tmp.fileSync({ prefix: 'pycode', postfix: '.py' });
    const filePath = tmpobj.name
    fs.writeFileSync(filePath, "answer = 1 + 1\n print(answer)")
    return codeExecutor.runPython(filePath).then(data => {

    }).catch(error => {
        expect(error.message).toMatch(/Error/);
    });
});


test('No Errors, newline to separate', () => {
    const tmpobj = tmp.fileSync({ prefix: 'pycode', postfix: '.py' });
    const filePath = tmpobj.name
    fs.writeFileSync(filePath, "answer = 1 + 1\nprint(answer)")
    return codeExecutor.runPython(filePath).then(data => {
        expect(data).toBe('2\n');
    });
});


test('Correct input, get square root of 64, use of import statements -> math', () => {
    const tmpobj = tmp.fileSync({ prefix: 'pycode', postfix: '.py' });
    const filePath = tmpobj.name
    fs.writeFileSync(filePath, "import math\nx = math.sqrt(64)\nprint(x)")
    return codeExecutor.runPython(filePath).then(data => {
        expect(data).toBe('8.0\n');
    });
});

test('Error, correct input, import panda does not work as module not downloaded', () => {
    const tmpobj = tmp.fileSync({ prefix: 'pycode', postfix: '.py' });
    const filePath = tmpobj.name
    fs.writeFileSync(filePath, "import panda")
    return codeExecutor.runPython(filePath).then(data => {

    }).catch(error => {
        expect(error.message).toMatch(/Error/);
    });
});

test('Correct input, with function fibonacci', () => {
    const tmpobj = tmp.fileSync({ prefix: 'pycode', postfix: '.py' });
    const filePath = tmpobj.name
    fs.writeFileSync(filePath, "def fib(n):\n if n == 0:\n    return n\n elif n == 1 or n == 2:\n    return 1\n else:\n     return fib(n - 1) + fib(n - 2)\nprint(fib(10))")
    return codeExecutor.runPython(filePath).then(data => {
        expect(data).toBe('55\n');
    });
});

jest.setTimeout(15000);

test('Error, correct input, with function fibonacci, big input, time exceeded', () => {
    const tmpobj = tmp.fileSync({ prefix: 'pycode', postfix: '.py' });
    const filePath = tmpobj.name
    fs.writeFileSync(filePath, "def fib(n):\n if n == 0:\n    return n\n elif n == 1 or n == 2:\n    return 1\n else:\n     return fib(n - 1) + fib(n - 2)\nprint(fib(100))")
    return codeExecutor.runPython(filePath).then(data => {

    }).catch(error => {
        expect(error.message).toBe("Time Limit Exceeded: Code took too long to finish executing")
    });
});
