import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import "./FlightSearch.css";

const FlightSearch = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  // אוטוקומפליט ליעדים
  const fetchSuggestions = async (query, setter) => {
    if (!query || query.length < 2) {
      setter([]);
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/flights/airports/autocomplete`, {
        params: { keyword: query },
      });
      setter(res.data.data || []);
    } catch (e) {
      setter([]);
    }
  };

  const onSearch = async (e) => {
    e.preventDefault();
    setErr("");
    if (!origin || !destination || !departureDate) {
      setErr("נא למלא את כל השדות הנדרשים.");
      return;
    }
    setLoading(true);
    try {
      const search = {
        origin,
        destination,
        date: departureDate,
        returnDate,
        passengers,
      };
      localStorage.setItem("flight-search", JSON.stringify(search));
      navigate("/results");
    } catch (error) {
      setErr("אירעה תקלה. נסה שוב.");
    }
    setLoading(false);
  };

  return (
    <div className="search-container">
      <form className="search-box" onSubmit={onSearch}>
        <h2>טוסו כבר – חיפוש טיסות</h2>

        <label htmlFor="origin">מוצא:</label>
        <input
          id="origin"
          type="text"
          value={origin}
          onChange={e => {
            setOrigin(e.target.value.toUpperCase());
            fetchSuggestions(e.target.value, setOriginSuggestions);
          }}
          autoComplete="off"
          placeholder="TLV"
          required
        />
        {originSuggestions.length > 0 && (
          <div className="suggestions">
            {originSuggestions.map((s, idx) => (
              <div
                key={idx}
                className="suggestion"
                onClick={() => {
                  setOrigin(s.iataCode);
                  setOriginSuggestions([]);
                }}
              >
                {s.iataCode} – {s.name} {s.city && `(${s.city})`}
              </div>
            ))}
          </div>
        )}

        <label htmlFor="destination">יעד:</label>
        <input
          id="destination"
          type="text"
          value={destination}
          onChange={e => {
            setDestination(e.target.value.toUpperCase());
            fetchSuggestions(e.target.value, setDestSuggestions);
          }}
          autoComplete="off"
          placeholder="JFK"
          required
        />
        {destSuggestions.length > 0 && (
          <div className="suggestions">
            {destSuggestions.map((s, idx) => (
              <div
                key={idx}
                className="suggestion"
                onClick={() => {
                  setDestination(s.iataCode);
                  setDestSuggestions([]);
                }}
              >
                {s.iataCode} – {s.name} {s.city && (${s.city})}
              </div>
            ))}
          </div>
        )}

        <label htmlFor="departureDate">תאריך יציאה:</label>
        <input
          id="departureDate"
          type="date"
          value={departureDate}
          onChange={e => setDepartureDate(e.target.value)}
          required
          min="2024-07-01"
          max="2024-09-30"
        />

        <label htmlFor="returnDate">תאריך חזרה (אופציונלי):</label>
        <input
          id="returnDate"
          type="date"
          value={returnDate}
          onChange={e => setReturnDate(e.target.value)}
          min="2024-07-01"
          max="2024-09-30"
        />

        <label htmlFor="passengers">מספר נוסעים:</label>
        <input
          id="passengers"
          type="number"
          min={1}
          max={9}
          value={passengers}
          onChange={e => setPassengers(Number(e.target.value))}
          required
        />

        {err && <div className="search-error">{err}</div>}

        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? "מחפש..." : "חפש טיסה"}
        </button>

        <div style={{ color: "#fff", marginTop: "12px", fontSize: "0.98rem", opacity: 0.8 }}>
          <b>טיפ לבדיקה:</b> במצב בדיקות (Sandbox) יש לבחור <u>תאריכים בין יולי לספטמבר 2024 בלבד</u>.
        </div>
      </form>
    </div>
  );
};

export default FlightSearch;
