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
      {flights.map((flight, idx) => (
        <div key={idx} className="flight-card">
          {flight.itineraries.map((itinerary, itineraryIdx) => (
            <div key={itineraryIdx}>
              <h3>{itineraryIdx === 0 ? '✈️ הלוך' : '✈️ חזור'}</h3>
              {itinerary.segments.map((segment, segmentIdx) => (
                <div key={segmentIdx} className="segment-info">
                  <p>
                    🛫 המראה: {airportsHebrew[segment.departure.iataCode] || segment.departure.iataCode} בשעה {segment.departure.at.slice(11, 16)}
                  </p>
                  <p>
                    🛬 נחיתה: {airportsHebrew[segment.arrival.iataCode] || segment.arrival.iataCode} בשעה {segment.arrival.at.slice(11, 16)}
                  </p>
                  <p>✈️ חברת תעופה: {segment.carrierCode} | טיסה מס׳ {segment.number}</p>
                  <p>⏱️ זמן טיסה: {segment.duration.slice(2)}</p>
                </div>
              ))}
            </div>
          ))}
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
      ))}
    </div>
  );
};

export default FlightResults;

