// /frontend/src/components/chatwidget.jsx
import React, { useState } from "react";
import axios from "axios";
import "./chatwidget.css";

const API_URL = "https://tusokvar-demo.onrender.com"; // כתובת ה-backend שלך

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([
    { from: "bot", text: "שלום! איך אפשר לעזור לך היום?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setChat([...chat, { from: "user", text: input }]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/chat/ask`, { message: input });
      setChat((prev) => [...prev, { from: "bot", text: res.data.answer }]);
    } catch (err) {
      setChat((prev) => [...prev, { from: "bot", text: "מצטערים, אירעה שגיאה" }]);
    }
    setLoading(false);
  };

  return (
    <div className={`chatwidget-container ${open ? "open" : ""}`}>
      {open ? (
        <div className="chatbox">
          <div className="chatbox-header" onClick={() => setOpen(false)}>
            צ'אט עם טוסו כבר
          </div>
          <div className="chatbox-body">
            {chat.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.from}`}>{msg.text}</div>
            ))}
            {loading && <div className="chat-msg bot">...טוען תשובה</div>}
          </div>
          <div className="chatbox-footer">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="הקלד הודעה…"
              onKeyDown={e => (e.key === "Enter" && handleSend())}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()}>שלח</button>
          </div>
        </div>
      ) : (
        <button className="open-chat-btn" onClick={() => setOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
