const fs = require("fs");
const app = require("./express-server");

const httpsServer = require("https").createServer({
  key: fs.readFileSync("/etc/tls-secrets/tls.key"),
  cert: fs.readFileSync("/etc/tls-secrets/tls.crt")
}, app)
// }, (req, res) => {
//   res.writeHead(200, {
//     "Access-Control-Allow-Origin": "https://*.onlyduh.com",
//     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
//     "Access-Control-Allow-Methods": "OPTIONS, POST, GET"
//   });
//   if (req.url === "/") {
//     res.write("Hello!")
//     res.end();
//     return;
//   }
//   if (req.method === 'OPTIONS') {
//     res.writeHead(204, headers);
//     res.end();
//     return;
//   }
// });

const io = require("socket.io")(httpsServer, {
  cors: {
    origin: true,
    methods: ["GET", "POST"]
  },
  secure:true,
  reconnect: true,
  rejectUnauthorized : false
});

app.listen(process.env.SESSIONS_SOCKET_PORT);
httpsServer.listen(process.env.SESSIONS_SOCKET_PORT);

module.exports = io;