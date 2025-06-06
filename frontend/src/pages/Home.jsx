import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./Home.css"; // ייבוא עיצוב

const API_URL = "https://tusokvar-demo.onrender.com"; // כתובת הבקאנד שלך

export default function Home() {
  const [origin, setOrigin] = useState("");
  const [originOptions, setOriginOptions] = useState([]);
  const [destination, setDestination] = useState("");
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // שליפת הצעות מוצא
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

  // שליפת הצעות יעד
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

  // בחירת תאריך יציאה
  const handleDepartureDateChange = (e) => {
    setDepartureDate(e.target.value);
    if (returnDate && e.target.value > returnDate) {
      setReturnDate("");
    }
  };

  // בחירת תאריך חזרה
  const handleReturnDateChange = (e) => {
    setReturnDate(e.target.value);
  };

  // שליחה (לחיפוש)
  const handleSubmit = (e) => {
    e.preventDefault();
    // כאן אפשר לקרוא ל-API לחיפוש טיסות ולנתב לעמוד תוצאות
    alert(
      `מוצא: ${origin}, יעד: ${destination}, יציאה: ${departureDate}, חזרה: ${
        returnDate || "אין"
      }`
    );
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

        <button type="submit">חפש טיסה</button>
      </form>
    </div>
  );
}
