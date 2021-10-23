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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('No such API route found');
    err.status = 404;
    next(err);
});
  

// Error Handling Middleware - send a JSON response instead of HTML
app.use((err, req, res, next) => {
    res.status(err.status).send({ error: err.message });
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
});


