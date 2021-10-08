const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')

// Run Python Script

const runPython = (filePath) => {
    return new Promise((resolve, reject) => {

        const { spawn } = require('child_process')
        const pyprog = spawn('python', [filePath])
        const output = []

        pyprog.stdout.on('data', function(data) {
            output.push(data.toString())
        });
    
        pyprog.stderr.on('data', (data) => {
            reject(data.toString());
        });

        pyprog.on('exit', (code) => {
            console.log("Process quit with code : " + code);
            resolve(output)
        });
    
    })
}

router.post('/', (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({  // Bad Request
            message: "Content cannot be empty!"
        });
    }
    filePath = path.join(__dirname, 'code', 'pycode.py')
    fs.writeFileSync(filePath, req.body.code)
    runPython(filePath)
        .then(output => {
            res.send({ output, message: 'Code ran without errors.' })
        })
        .catch(err => {
            res.status(500).send({ error: err, message: 'Errors were found while executing the code.' })
        })
    // fs.unlinkSync(filePath)  // remove the temporary code file
})

module.exports = router