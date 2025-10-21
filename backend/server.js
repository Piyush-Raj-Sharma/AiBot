require('dotenv').config();
const app = require('./src/app');
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/services/ai.service');

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

// There are two types of events: In-built events and Custom events

// In-built events: connection, disconnect
// Custom events: Any event defined by the developer

chat_history = [] //applying short term memory

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });  

    socket.on("ai-response", async(data)=>{

        console.log("Recieved user prompt:", data.prompt);
        chat_history.push({role: "user", content: data.prompt}) // updating chat history
      
        const response = await generateResponse(chat_history);
        console.log(response);

        chat_history.push({role: "model", content: response}) // updating chat history
        socket.emit("ai-response-message", response );
    })
});

httpServer.listen(3000, () => {
    console.log("Server is running at port 3000");  
})