import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';
import FlightResults from './FlightResults';

function Home() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        https://tusokvar-demo-1.onrender.com/api/flights/search,
        {
          params: { origin, destination, date }
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error('שגיאה בחיפוש טיסות:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (flight) => {
    try {
      // פעולה עתידית: שליחת מייל עם flight
      alert(נשלח מייל אישור על הטיסה ${flight.flightNumber});
    } catch (error) {
      console.error('שגיאה בעת ההזמנה:', error);
    }
  };

  return (
    <div className="home-container">
      <h1>טוסו כבר ✈</h1>
      <div className="search-form">
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
        <button onClick={handleSearch}>חפש</button>
      </div>
      {loading ? <p>טוען תוצאות...</p> : (
        <FlightResults results={results} onBook={handleBook} />
      )}
    </div>
  );
}

export default Home;
