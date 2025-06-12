import { useState } from 'react';
import api from '../utils/api';
import './chatwidget.css';

const ChatWidget = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    try {
      const res = await api.post('/chat', { prompt: message });
      setResponse(res.data.reply);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-widget-container">
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>

      {isOpen && (
        <div className="chat-box">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="שאל על טיסות ונופש"
          />
          <button onClick={sendMessage}>שלח</button>
          {response && <div className="response">{response}</div>}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

