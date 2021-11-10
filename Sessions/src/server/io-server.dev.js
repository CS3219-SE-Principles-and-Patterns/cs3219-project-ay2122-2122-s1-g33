const io = require("socket.io")({
  cors: {
    origin: true,
    methods: ["GET", "POST"]
  }
});

module.exports = io;