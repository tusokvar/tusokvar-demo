// src/pages/FlightSearch.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FlightSearch.css";

const FlightSearch = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);

  // חיפוש שדות תעופה/יעדים
  const fetchAirports = async (keyword, setOptions) => {
    if (!keyword || keyword.length < 2) return setOptions([]);
    try {
      const res = await fetch(
        `/api/flights/airports/autocomplete?keyword=${encodeURIComponent(keyword)}`
      );
      const data = await res.json();
      setOptions(data.data || []);
    } catch (e) {
      setOptions([]);
    }
  };

  // שליחת חיפוש טיסה
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!origin || !destination || !departureDate) {
      setError("יש למלא את כל השדות");
      return;
    }
    setLoading(true);
    try {
      // שמירת חיפוש ל־localStorage למעבר תוצאות
      localStorage.setItem(
        "flight-search",
        JSON.stringify({
          origin,
          destination,
          departureDate,
          returnDate,
          passengers,
        })
      );
      navigate("/results");
    } catch (e) {
      setError("אירעה שגיאה, נסה שוב");
    }
    setLoading(false);
  };

  return (
    <div className="flight-search-container">
      <h1>טוסו כבר</h1>
      <form className="flight-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="origin">מוצא:</label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
              fetchAirports(e.target.value, setOriginOptions);
            }}
            autoComplete="off"
            placeholder="TLV"
            required
            list="origin-options"
          />
          <datalist id="origin-options">
            {originOptions.map((opt, i) => (
              <option key={i} value={opt.iataCode}>
                {opt.name} ({opt.iataCode}) {opt.city} {opt.country}
              </option>
            ))}
          </datalist>
        </div>
        <div className="input-group">
          <label htmlFor="destination">יעד:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              fetchAirports(e.target.value, setDestinationOptions);
            }}
            autoComplete="off"
            placeholder="JFK"
            required
            list="destination-options"
          />
          <datalist id="destination-options">
            {destinationOptions.map((opt, i) => (
              <option key={i} value={opt.iataCode}>
                {opt.name} ({opt.iataCode}) {opt.city} {opt.country}
              </option>
            ))}
          </datalist>
        </div>
        <div className="input-group">
          <label htmlFor="departureDate">תאריך יציאה:</label>
          <input
            type="date"
            id="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="returnDate">תאריך חזרה (אופציונלי):</label>
          <input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="passengers">מספר נוסעים:</label>
          <input
            type="number"
            id="passengers"
            min="1"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? "מחפש..." : "חפש טיסה"}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
      <div className="search-tip">טיפ: אפשר להקליד גם שם עיר/שדה, לא רק קוד IATA</div>
    </div>
  );
};

export default FlightSearch;
