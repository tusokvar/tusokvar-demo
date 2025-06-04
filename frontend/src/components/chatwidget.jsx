import React, { useState } from 'react';
import './chatwidget.css';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'היי! איך אפשר לעזור?' }
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: 'קיבלתי את ההודעה שלך 🙂' }
        ]);
      }, 1000);
    }
  };

  return (
    <div className={chat-widget ${isOpen ? 'open' : ''}}>
      <div className="chat-toggle" onClick={toggleChat}>
        💬
      </div>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={message ${msg.sender}}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="הקלד הודעה..."
            />
            <button onClick={handleSend}>שלח</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
