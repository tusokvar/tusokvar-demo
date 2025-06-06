// src/components/chatwidget.jsx
import React, { useState } from "react";
import "./chatwidget.css";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([
    { from: "bot", text: "שלום! איך אפשר לעזור לך היום?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setChat([...chat, { from: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { from: "bot", text: "נשמע מעולה! צוות טוסו כבר כאן לכל שאלה." }
      ]);
    }, 800);
  };

  return (
    <div className={chatwidget-container ${open ? "open" : ""}}>
      {open ? (
        <div className="chatbox">
          <div className="chatbox-header" onClick={() => setOpen(false)}>
            צ'אט עם טוסו כבר
          </div>
          <div className="chatbox-body">
            {chat.map((msg, idx) => (
              <div key={idx} className={chat-msg ${msg.from}}>{msg.text}</div>
            ))}
          </div>
          <div className="chatbox-footer">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="הקלד הודעה…"
              onKeyDown={e => (e.key === "Enter" && handleSend())}
            />
            <button onClick={handleSend}>שלח</button>
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
