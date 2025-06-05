// src/pages/FlightResults.jsx
import React from 'react';
import './FlightResults.css';

const FlightResults = ({ results, onBook }) => {
  return (
    <div className="results-container">
      <h2>תוצאות חיפוש</h2>
      {results.length === 0 ? (
        <p>לא נמצאו טיסות תואמות</p>
      ) : (
        results.map((flight, index) => (
          <div key={index} className="flight-card">
            <p><strong>חברה:</strong> {flight.airline}</p>
            <p><strong>מספר טיסה:</strong> {flight.flightNumber}</p>
            <p><strong>מוצא:</strong> {flight.origin}</p>
            <p><strong>יעד:</strong> {flight.destination}</p>
            <p><strong>תאריך:</strong> {flight.date}</p>
            <p><strong>שעה:</strong> {flight.time}</p>
            <p><strong>מחיר:</strong> {flight.price} ₪</p>
            <button onClick={() => onBook(flight)}>הזמן</button>
          </div>
        ))
      )}
    </div>
  );
};

export default FlightResults;
