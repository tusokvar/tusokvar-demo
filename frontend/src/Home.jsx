import React, { useState } from 'react';
import './Home.css';
import ChatWidget from './components/ChatWidget';

function Home() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(https://tusokvar-demo.onrender.com/api/flights?origin=${origin}&destination=${destination}&date=${date});
      const data = await response.json();
      setResults(data.flights || []);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  return (
    <div className="home-container">
      <h1>טוסו כבר ✈</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="מוצא (Origin)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="יעד (Destination)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSearch}>חיפוש טיסה</button>
      </div>

      <div className="results-section">
        {results.length > 0 ? (
          results.map((flight, index) => (
            <div key={index} className="flight-card">
              <p><strong>מחיר:</strong> {flight.price} ₪</p>
              <p><strong>חברת תעופה:</strong> {flight.airline}</p>
              <p><strong>שעת המראה:</strong> {flight.departureTime}</p>
              <p><strong>שעת נחיתה:</strong> {flight.arrivalTime}</p>
            </div>
          ))
        ) : (
          <p>אין תוצאות להצגה.</p>
        )}
      </div>

      <ChatWidget />
    </div>
  );
}

export default Home;
