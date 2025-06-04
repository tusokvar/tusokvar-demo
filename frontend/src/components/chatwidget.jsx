import React, { useState } from 'react';
import './chatwidget.css';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'שלום! איך אפשר לעזור?' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const updatedMessages = [
      ...messages,
      { from: 'user', text: newMessage },
      { from: 'bot', text: 'נחזור אליך בהקדם!' }
    ];

    setMessages(updatedMessages);
    setNewMessage('');
  };

  return (
    <div className={chat-widget ${isOpen ? 'open' : ''}}>
      <button className="chat-toggle" onClick={toggleChat}>
        💬
      </button>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={chat-message ${msg.from}}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="הקלד הודעה..."
            />
            <button onClick={sendMessage}>שלח</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
