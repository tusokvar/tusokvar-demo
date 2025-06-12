import { useState } from 'react';
import api from '../utils/api';
import './chatwidget.css';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setOpen(prev => !prev);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);

    const userMessage = { sender: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');

    try {
      const res = await api.post('/chat', { prompt: message });
      const botMessage = { sender: 'bot', text: res.data.reply };
      setChatHistory(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [...prev, { sender: 'bot', text: 'שגיאה בתקשורת, אנא נסה שוב.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-widget-container">
      {open && (
        <div className="chat-box">
          <div className="chat-messages">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chat-message bot">מקליד...</div>}
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
      <button className="chat-toggle-btn" onClick={toggleChat}>
        {open ? '✖' : '💬'}
      </button>
    </div>
  );
};

export default ChatWidget;
