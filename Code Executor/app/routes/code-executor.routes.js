const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')

const apiTimeout = 10 * 1000 // 10s

// Router Middleware
// router.use((req, res, next) => {
//     // Set timeout for all HTTP Requests through this router
//     req.setTimeout(timeout, () => {
//         let err = new Error('Request Timeout')
//         err.status = 408;
//         next(err);
//     })
//     // Set the server response timeout for all HTTP Requests
//     res.setTimeout(timeout, () => {
//         let err = new Error('Time Limit Exceeded: Code took too long to finish executing')
//         err.status = 504;
//         next(err);
//     })
//     next()
// })

// Run Python Script

const runPython = (filePath) => {
    return new Promise((resolve, reject) => {

        const { spawn } = require('child_process')
        const pyprog = spawn('python', [filePath])

        // Kill the child process after timing out
        setTimeout(() => {
            pyprog.kill()
        }, apiTimeout)

        const output = []

        pyprog.stdout.on('data', function(data) {
            output.push(data.toString())
        });
    
        pyprog.stderr.on('data', (data) => {
            let error = new Error(data.toString())
            reject(error)
        });

        pyprog.on('exit', (code, signal) => {
            console.log(`Process quit with code ${code} with receipt of signal ${signal}`);
            if (signal === 'SIGTERM') {
                let error = new Error('Time Limit Exceeded: Code took too long to finish executing')
                error.status = 504
                reject(error)
            }
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
        .catch(error => {
            if (error.status) {
                res.status(error.status).send({ error: error.message, message: 'Errors were found while executing the code.' })
            } else {
                res.status(500).send({ error, message: 'Errors were found while executing the code.' })
            }
        })
    // fs.unlinkSync(filePath)  // remove the temporary code file
})

module.exports = router