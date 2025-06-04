import React, { useState } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'ברוך הבא! איך אפשר לעזור?' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    // דמוי תגובת בוט פשוטה
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: 'נציג ישיב בהקדם 😊' }]);
    }, 1000);
  };

  return (
    <div className={chat-widget ${isOpen ? 'open' : ''}}>
      <div className="chat-toggle" onClick={toggleChat}>
        💬
      </div>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={message ${msg.from}}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="הקלד הודעה..."
            />
            <button onClick={sendMessage}>שלח</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
