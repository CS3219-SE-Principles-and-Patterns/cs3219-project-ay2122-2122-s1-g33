const express = require('express');
const codeExecutor = require('./routes/code-executor.routes');
const cors = require('cors')

// Create an Express App
const app = express();

// Use Json Parser Middleware to parse requests of content-type: application/json
app.use(express.json());

// Enable Cross Origin (CORS) Requests 
app.use(cors());

// Load the router modules for Code Executor
app.use('/code-executor', codeExecutor);

// Index Route
app.get('/', (req, res) => {
    res.json({message: 'Code Executor'});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
});
