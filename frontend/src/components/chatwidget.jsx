// frontend/src/components/chatwidget.jsx
import { useState } from 'react';
import api from '../utils/api';
import './chatwidget.css';  // <--- הוספה זו

const ChatWidget = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      const res = await api.post('/chat', { prompt: message });
      setResponse(res.data.reply);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-widget">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="שאל על טיסות ונופש"
      />
      <button onClick={sendMessage}>שלח</button>
      {response && <div>{response}</div>}
    </div>
  );
};

export default ChatWidget;
