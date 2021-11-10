const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Cors
const corsOptions = {
  origin: ['https://*.onlyduh.com', 'https://onlyduh.com'],
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE","OPTIONS"],
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))

require('./routes')(app);

module.exports = app;