// frontend/src/pages/FlightResults.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './FlightResults.css';

const FlightResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await api.post('/flights/search', state);
        setFlights(res.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [state]);

  if (loading) return <div>טוען תוצאות...</div>;

  return (
    <div className="results-container">
      {flights.map((flight, idx) => (
        <div key={idx} className="flight-card">
          <p>
            {flight.itineraries[0].segments[0].departure.iataCode} →
            {flight.itineraries[0].segments[0].arrival.iataCode}
          </p>
          <p>מחיר: {flight.price.total} {flight.price.currency}</p>
          <button onClick={() => navigate('/booking', { state: { flight } })}>
            הזמן עכשיו
          </button>
        </div>
      ))}
    </div>
  );
};

export default FlightResults;
