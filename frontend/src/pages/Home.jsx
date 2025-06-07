import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "./Home.css";

const API_URL = "https://tusokvar-demo.onrender.com";

export default function Home() {
  const [origin, setOrigin] = useState("");
  const [originOptions, setOriginOptions] = useState([]);
  const [destination, setDestination] = useState("");
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // autocomplete מוצא
  const handleOriginChange = async (e) => {
    const value = e.target.value;
    setOrigin(value);
    if (value.length > 1) {
      try {
        const res = await axios.get(
          `${API_URL}/api/flights/airports/autocomplete?keyword=${value}`
        );
        setOriginOptions(res.data.data || []);
      } catch (err) {
        setOriginOptions([]);
      }
    } else {
      setOriginOptions([]);
    }
  };

  // autocomplete יעד
  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    if (value.length > 1) {
      try {
        const res = await axios.get(
          `${API_URL}/api/flights/airports/autocomplete?keyword=${value}`
        );
        setDestinationOptions(res.data.data || []);
      } catch (err) {
        setDestinationOptions([]);
      }
    } else {
      setDestinationOptions([]);
    }
  };

  // תאריך יציאה
  const handleDepartureDateChange = (e) => {
    setDepartureDate(e.target.value);
    if (returnDate && e.target.value > returnDate) {
      setReturnDate("");
    }
  };

  // תאריך חזרה
  const handleReturnDateChange = (e) => {
    setReturnDate(e.target.value);
  };

  // שליחת חיפוש ל-API והעברה לעמוד תוצאות
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/flights/search`, {
        origin,
        destination,
        departureDate,
        returnDate
      });
      // ניווט עם התוצאות לעמוד תוצאות
      navigate("/results", { state: { flights: res.data } });
    } catch (err) {
      setError("אירעה תקלה בחיפוש טיסות, נסה שנית.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>טוסו כבר</h1>
      <form onSubmit={handleSubmit}>
        <label>מוצא:</label>
        <input
          value={origin}
          onChange={handleOriginChange}
          placeholder="הכנס מוצא (לדוג' TLV)"
          autoComplete="off"
          list="origin-options"
        />
        <datalist id="origin-options">
          {originOptions.map((opt) => (
            <option key={opt.iataCode} value={opt.iataCode}>
              {opt.name} ({opt.iataCode}){opt.city ? ` - ${opt.city}` : ""}
            </option>
          ))}
        </datalist>

        <label>יעד:</label>
        <input
          value={destination}
          onChange={handleDestinationChange}
          placeholder="הכנס יעד (לדוג' JFK)"
          autoComplete="off"
          list="destination-options"
        />
        <datalist id="destination-options">
          {destinationOptions.map((opt) => (
            <option key={opt.iataCode} value={opt.iataCode}>
              {opt.name} ({opt.iataCode}){opt.city ? ` - ${opt.city}` : ""}
            </option>
          ))}
        </datalist>

        <label>תאריך יציאה:</label>
        <input
          type="date"
          value={departureDate}
          onChange={handleDepartureDateChange}
          min={format(new Date(), "yyyy-MM-dd")}
          required
        />

        <label>תאריך חזרה (אופציונלי):</label>
        <input
          type="date"
          value={returnDate}
          onChange={handleReturnDateChange}
          min={departureDate || format(new Date(), "yyyy-MM-dd")}
        />

        <button type="submit" disabled={loading}>
          {loading ? "טוען..." : "חפש טיסה"}
        </button>
        {error && <div style={{ color: "#ffe16b", marginTop: "14px" }}>{error}</div>}
      </form>
    </div>
  );
}
