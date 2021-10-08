const {docsDB} = require("../database/docsDB");
const { getDoc, setDoc } = require("../database/helpers/stubDbCalls");
const io = require("socket.io")(process.env.SESSIONS_SOCKET_PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socket => {
  socket.on("get-document", async (docId, userId) => {
    const document = await getDoc(docId);
    if (!document) {
      socket.emit("document-not-found", docId);
      socket.disconnect();
      return;
    }
    // Join room based off document ID.
    socket.join(docId);
    socket.emit("load-document", document.docData);

    socket.on("send-changes", delta => {
      socket.broadcast.to(docId).emit("receive-changes", delta);
    });

    socket.on("save-document", async data => {
      await setDoc(docId, { id:docId, userData });
    });
  });

  socket.on("disconnecting", (reason) => {
    if (socket.rooms) {
      io.to(socket.rooms).emit("user-disconnecting", reason)
      socket.leave(socket.rooms);
    }
  })
})
