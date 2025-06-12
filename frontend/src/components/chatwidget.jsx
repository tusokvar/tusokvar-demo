// frontend/src/components/ChatWidget.jsx
import { useState } from 'react';
import api from '../utils/api';
import './chatwidget.css';

const ChatWidget = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await api.post('/chat', { prompt: message });
      setResponse(res.data.reply);
    } catch (err) {
      console.error(err);
      setResponse('שגיאה בהתחברות לצ׳אט, נסה שוב.');
    }

    setLoading(false);
  };

  return (
    <div className="chat-widget">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="שאל על טיסות ונופש"
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'שולח...' : 'שלח'}
      </button>
      {response && <div className="chat-response">{response}</div>}
    </div>
  );
};

export default ChatWidget;
