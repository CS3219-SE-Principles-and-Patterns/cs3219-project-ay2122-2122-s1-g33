const { getDoc } = require("../database/docsService");
const { getDocDataFromCache, setCodeDocStr, deleteDocDataFromCache, getCodeExecutionStatus, setCodeExecutionStatus } = require("../database/helpers/cacheDbCalls");

const io = require("socket.io")(process.env.SESSIONS_SOCKET_PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socket => {
  console.log("connection here")
  socket.on("get-document", async (docId, userId) => {
    let document = await getDocDataFromCache(docId);
    if (!document) {
      const response = await getDoc(docId);
      const {docText} = response.data;
      if (!docText) {
        socket.emit("document-not-found", docId);
        socket.disconnect();
        return;
      } else {
        document = docText;
      }
    }
    // Join room based off document ID.
    socket.join(docId);
    socket.emit("load-document", document);

    socket.on("send-changes", async delta => {
      const isCodeExecRunning = await getCodeExecutionStatus(docId);
      if (isCodeExecRunning) {
        socket.emit("code-still-running")
      } else {
        socket.broadcast.to(docId).emit("receive-changes", delta);
      }
    });

    socket.on("run-code", async (userId, data) => {
      const isCodeExecRunning = await getCodeExecutionStatus(docId);
      if (isCodeExecRunning) {
        socket.emit("code-still-running")
      } else {
        socket.broadcast.to(docId).emit("code-execution-start");
        await setCodeExecutionStatus(docId, true);
        const res = await executeCode(data);
        socket.emit("code-execution-end", res.body);
      }
    })

    socket.on("save-document", async data => {
      await setCodeDocStr(docId, data);
    });
  
  });

  socket.on("disconnecting", (reason) => {
    if (socket.rooms) {
      io.to(socket.rooms).emit("user-disconnecting", reason)
      socket.leave(socket.rooms);
    }
  })
})

// io.of("/").adapter.on("leave-room", (room, id) => {
//   if (io.sockets.clients(room).length > 0) {
//     return;
//   }
//   deleteDocDataFromCache(id);
// });
