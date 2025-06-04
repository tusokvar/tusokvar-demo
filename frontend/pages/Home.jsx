import React, { useState } from 'react';
import './Home.css';
import ChatWidget from '../components/ChatWidget';

function Home() {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching flights with:', formData);
    // פה נשלב שליחה לשרת בהמשך
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>טוסו כבר</h1>
        <p>השוואת טיסות ומלונות בזמן אמת, בלי הפתעות במחיר.</p>
      </header>

      <form className="flight-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="origin"
          placeholder="מוצא"
          value={formData.origin}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destination"
          placeholder="יעד"
          value={formData.destination}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="returnDate"
          value={formData.returnDate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="passengers"
          min="1"
          value={formData.passengers}
          onChange={handleChange}
          required
        />
        <button type="submit">חפש טיסות</button>
      </form>

      <div className="chat-fixed">
        <ChatWidget />
      </div>
    </div>
  );
}

export default Home;
