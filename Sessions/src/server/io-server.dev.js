const io = require("socket.io")(process.env.SESSIONS_SOCKET_PORT, {
  cors: {
    origin: true,
    methods: ["GET", "POST"]
  }
});

module.exports = io;