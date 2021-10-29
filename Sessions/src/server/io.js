const { getDoc } = require("../database/docsService");
const { getDocDataFromCache,
  setCodeDocStr,
  getCodeExecutionStatus,
  setCodeExecutionStatus
} = require("../database/helpers/cacheDbCalls");
const { executeCode } = require("../codeExecutor/codeExecutorService");

const io = require("socket.io")(process.env.SESSIONS_SOCKET_PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socket => {
  console.log("connection here")
  socket.on("get-document", async (docId, userId) => {
    let document = null;
    const cacheData = await getDocDataFromCache(docId);
    if (!cacheData) {
      const response = await getDoc(docId);
      const {docText} = response.data;
      if (!docText) {
        socket.emit("document-not-found", docId);
        socket.disconnect();
        return;
      } else {
        document = docText;
      }
    } else {
      document = cacheData.docData;
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
        await setCodeExecutionStatus(docId, 1);
        let output = { output: "", error: "An unexpected error has occurred while executing your code."};
        try {
          const res = await executeCode(data);
          output = res.data;
        } catch (err) {
          if (err.response && err.response.data && err.response.data.error && err.response.data.message) {
            output = err.data;
          } else {
            console.log(err);
          }
        } finally {
          socket.emit("code-execution-end", output);
          socket.broadcast.to(docId).emit("code-execution-end", output);
          await setCodeExecutionStatus(docId, 0);
        }
        
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
  
//   deleteDocDataFromCache(id);
// });
