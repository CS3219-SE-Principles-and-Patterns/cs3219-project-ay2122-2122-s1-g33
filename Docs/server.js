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

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-type,Accept,x-access-token,X-Key"
//   );
//   if (req.method == "OPTIONS") {
//     res.status(200).end();
//   } else {
//     next();
//   }
// });

app.use(cors(corsOptions))

require('./routes')(app);

module.exports = app;