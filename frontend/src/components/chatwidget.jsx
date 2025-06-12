// frontend/src/components/ChatWidget.jsx
import { useState } from 'react';
import api from '../utils/api';
import './chatwidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    const userMessage = { sender: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');

    try {
      const res = await api.post('/chat', { prompt: userMessage.text });
      setChatHistory(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { sender: 'bot', text: 'שגיאה בתקשורת, אנא נסה שוב.' }]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-widget-container">
      {isOpen && (
        <div className="chat-box">
          <div className="chat-history">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chat-msg bot">מקליד...</div>}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="שאל על טיסות ונופש"
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>שלח</button>
          </div>
        </div>
      )}
      <button className="chat-toggle" onClick={() => setIsOpen(prev => !prev)}>
        💬
      </button>
    </div>
  );
};

export default ChatWidget;

