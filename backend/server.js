require('dotenv').config();
const app = require('./src/app');
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/services/ai.service');

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: ["http://localhost:5173", "https://aura-ai-five.vercel.app"]}});

let chat_history = []; // short-term memory

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("ai-response", async (data) => {
    try {
      console.log("Received user prompt:", data);

      // push user message
      chat_history.push({ role: "user", parts: [{text: data}]});

      // generate AI response
      const response = await generateResponse(chat_history);
      console.log("AI response:", response);

      // push AI response
      chat_history.push({ role: "model", parts: [{text: response}] });

      // send back to client
      socket.emit("ai-response-message", response);

    } catch (err) {
      console.error("Error handling AI response:", err);
      socket.emit("ai-response-message", "Server error occurred 😅");
    }
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running at port 3000");
});
