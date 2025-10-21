import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Chatbot.css";

const socket = io("http://localhost:3000");

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("ai-response-message", (response) => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => [...prev, { sender: "AI", text: response, time }]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage = { sender: "You", text: input, time };
    setMessages((prev) => [...prev, newMessage]);
    socket.emit("ai-response", input);
    setInput("");
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    const chatBox = document.querySelector(".chat-box");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Socket AI</h2>
      </div>

      <div className="chat-box">
        {messages.length === 0 && (
          <div className="chat-placeholder">
            Start conversation or ask anything...
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "You" ? "user" : "ai"}`}
          >
            <div className="msg-text">{msg.text}</div>
            <div className="msg-meta">
              <span>{msg.sender}</span>
              <span className="time">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div className="chat-box">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`chat-message ${msg.sender === "You" ? "user" : "ai"}`}
    >
      <div className="msg-text">{msg.text}</div>
      <div className="msg-meta">
        <span>{msg.sender}</span>
        <span className="time">{msg.time}</span>
      </div>
    </div>
  ))}

  {/* Loader bubble */}
  {isTyping && (
    <div className="chat-message ai typing">
      <div className="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  )}
</div>

    </div>
  );
};

export default Chatbot;
