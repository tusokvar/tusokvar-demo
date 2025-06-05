import React, { useState } from 'react';
import './Home.css';
import ChatWidget from './components/chatwidget';

function Home() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch("https://tusokvar-demo.onrender.com/api/flights");
      const data = await response.json();
      setResults(data.flights || []);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  return (
    <div className="home-container">
      <h1>✈ טוסו כבר</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="מוצא"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="יעד"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSearch}>חפש טיסות</button>
      </div>

      <div className="results-section">
        {results.length > 0 ? (
          results.map((flight, index) => (
            <div key={index} className="flight-card">
              <p>חברת תעופה: {flight.airline}</p>
              <p>יציאה: {flight.departure}</p>
              <p>נחיתה: {flight.arrival}</p>
              <p>מחיר: {flight.price} ₪</p>
            </div>
          ))
        ) : (
          <p>לא נמצאו טיסות</p>
        )}
      </div>

      <ChatWidget />
    </div>
  );
}

export default Home;
