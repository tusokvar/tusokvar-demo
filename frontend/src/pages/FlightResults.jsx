import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './FlightResults.css';

const airportsHebrew = {
  TLV: 'תל אביב',
  JFK: 'ניו יורק',
  CDG: 'פריז',
  AMS: 'אמסטרדם',
  FCO: 'רומא',
  MAD: 'מדריד',
  BCN: 'ברצלונה',
  LHR: 'לונדון',
  ATH: 'אתונה',
  IST: 'איסטנבול',
  DXB: 'דובאי',
  BKK: 'בנגקוק',
  BER: 'ברלין',
  VIE: 'וינה',
  // הוסף עוד יעדים כרצונך
};

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

  if (loading) return <div className="loading">טוען תוצאות...</div>;

  return (
    <div className="results-container">
      <h2>תוצאות חיפוש טיסות</h2>
      {flights.map((flight, idx) => {
        const departureCode = flight.itineraries[0].segments[0].departure.iataCode;
        const arrivalCode = flight.itineraries[0].segments[0].arrival.iataCode;
        const departureHebrew = airportsHebrew[departureCode] || departureCode;
        const arrivalHebrew = airportsHebrew[arrivalCode] || arrivalCode;

        return (
          <div key={idx} className="flight-card">
            <h3>
              ✈️ {departureHebrew} → {arrivalHebrew}
            </h3>
            <p className="flight-price">
              מחיר: {flight.price.total} {flight.price.currency}
            </p>
            <p className="flight-baggage">
              🧳 טרולי כלול (8 ק״ג)<br/>
              🧳 מזוודה גדולה בתוספת תשלום
            </p>
            <button
              className="book-btn"
              onClick={() =>
                navigate('/booking', {
                  state: {
                    flight,
                    amount: parseFloat(flight.price.total),
                  },
                })
              }
            >
              הזמן עכשיו
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FlightResults;
