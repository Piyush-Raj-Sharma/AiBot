const app = require('./src/app');
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

// There are two types of events: In-built events and Custom events

// In-built events: connection, disconnect
// Custom events: Any event defined by the developer

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });  

    socket.on("message", (msg) => {
        console.log( msg);
        });
});

httpServer.listen(3000, () => {
    console.log("Server is running at port 3000");  
})