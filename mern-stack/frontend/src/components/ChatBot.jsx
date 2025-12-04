import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm ZYPPR Bot. Ask me anything 🙂" }
  ]);
  const [input, setInput] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    // Show user message
    setMessages(prev => [...prev, { from: "user", text }]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/bot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { from: "bot", text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { from: "bot", text: "Server error 🤖" }]);
    }
  }

  return (
    <div style={{
      border: "1px solid #ddd", 
      padding: "10px", 
      width: "300px",
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      <div style={{ height: "250px", overflowY: "auto", marginBottom: "8px" }}>
        {messages.map((m, i) => (
          <div 
            key={i}
            style={{
              textAlign: m.from === "user" ? "right" : "left",
              margin: "5px 0"
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: m.from === "user" ? "#007bff" : "#eee",
                color: m.from === "user" ? "white" : "black",
                padding: "5px 8px",
                borderRadius: "6px"
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{ display: "flex", gap: "5px" }}>
        <input
          style={{ flex: 1, padding: "6px" }}
          placeholder="Type message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
