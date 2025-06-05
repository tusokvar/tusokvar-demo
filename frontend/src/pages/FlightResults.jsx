import React from "react";
import "./Home.css";

function FlightResults({ results }) {
  return (
    <div className="results-container">
      <h2>תוצאות חיפוש</h2>
      {results && results.length > 0 ? (
        results.map((flight, index) => (
          <div className="flight-card" key={index}>
            <h3>{flight.airline}</h3>
            <p>המראה: {flight.departure} | נחיתה: {flight.arrival}</p>
            <p>מחיר: ${flight.price}</p>
            <p>תנאי ביטול: {flight.cancellationPolicy}</p>
            <button>בחר טיסה זו</button>
          </div>
        ))
      ) : (
        <p>לא נמצאו טיסות.</p>
      )}
    </div>
  );
}

export default FlightResults;
