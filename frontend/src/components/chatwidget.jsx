import { useState } from 'react';
import api from '../utils/api';
import './chatwidget.css';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      const res = await api.post('/chat', { prompt: message });
      const newMessage = { user: message, bot: res.data.reply };
      setConversation([...conversation, newMessage]);
      setResponse(res.data.reply);
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-widget-container">
      {open && (
        <div className="chat-widget-window">
          <div className="chat-history">
            {conversation.map((conv, index) => (
              <div key={index}>
                <div className="user-message">{conv.user}</div>
                <div className="bot-message">{conv.bot}</div>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="שאל על טיסות ונופש"
          />
          <button onClick={sendMessage}>שלח</button>
        </div>
      )}
      <button className="chat-widget-toggle" onClick={() => setOpen(!open)}>
        💬
      </button>
    </div>
  );
};

export default ChatWidget;
