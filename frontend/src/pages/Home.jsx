import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../assets/logo.png"; // אם תוסיף לוגו כקובץ

const API_URL = "https://YOUR-BACKEND-URL.onrender.com/api/flights"; // עדכן לכתובת שלך

const Home = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // שמור ערכים בלוקאל סטוראג' כדי להעביר לעמוד התוצאות
      localStorage.setItem("flight-search", JSON.stringify({ origin, destination, date }));
      navigate("/results");
    } catch (err) {
      setError("ארעה שגיאה. נסה שוב.");
    }
    setLoading(false);
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <img src={logo} alt="טוסו כבר" className="home-logo" />
        <h1>טוסו כבר</h1>
      </div>
      <form className="flight-search-form" onSubmit={handleSearch}>
        <div>
          <label>מוצא</label>
          <input value={origin} onChange={e => setOrigin(e.target.value)} required placeholder="לדוג' TLV" />
        </div>
        <div>
          <label>יעד</label>
          <input value={destination} onChange={e => setDestination(e.target.value)} required placeholder="לדוג' JFK" />
        </div>
        <div>
          <label>תאריך טיסה</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>{loading ? "מחפש..." : "חפש טיסה"}</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Home;
