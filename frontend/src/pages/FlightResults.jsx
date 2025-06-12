import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './FlightResults.css';

const airportsHebrew = {
  TLV: 'תל אביב', JFK: 'ניו יורק', CDG: 'פריז', AMS: 'אמסטרדם', FCO: 'רומא',
  MAD: 'מדריד', BCN: 'ברצלונה', LHR: 'לונדון', ATH: 'אתונה', IST: 'איסטנבול',
  DXB: 'דובאי', BKK: 'בנגקוק', BER: 'ברלין', VIE: 'וינה',
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
      <h2>תוצאות חיפוש טיסות ✈️</h2>
      {flights.map((flight, idx) => (
        <div key={idx} className="flight-card">
          {flight.itineraries.map((itinerary, itineraryIdx) => (
            <div key={itineraryIdx} className="itinerary-section">
              <h3 className="itinerary-title">
                {itineraryIdx === 0 ? 'הלוך' : 'חזור'}
              </h3>
              {itinerary.segments.map((segment, segmentIdx) => (
                <div key={segmentIdx} className="segment-info">
                  <p><strong>🛫 המראה:</strong> {airportsHebrew[segment.departure.iataCode] || segment.departure.iataCode} בשעה {segment.departure.at.slice(11, 16)}</p>
                  <p><strong>🛬 נחיתה:</strong> {airportsHebrew[segment.arrival.iataCode] || segment.arrival.iataCode} בשעה {segment.arrival.at.slice(11, 16)}</p>
                  <p><strong>✈️ חברה:</strong> {segment.carrierCode} | טיסה מס׳ {segment.number}</p>
                  <p><strong>⏱️ זמן טיסה:</strong> {segment.duration.slice(2)}</p>
                </div>
              ))}
            </div>
          ))}
          <div className="flight-footer">
            <p className="flight-price">
              מחיר: {flight.price.total} {flight.price.currency}
            </p>
            <p className="flight-baggage">
              🧳 טרולי כלול (8 ק״ג) | 🧳 מזוודה גדולה בתוספת תשלום
            </p>
            <button
              className="book-btn"
              onClick={() => navigate('/booking', {
                state: { flight, amount: parseFloat(flight.price.total) }
              })}
            >
              הזמן עכשיו
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightResults;

