import React, { useState } from "react";
import "./Home.css";
import FlightResults from "./FlightResults";

function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    // כאן בעתיד נשלח בקשה אמיתית לשרת
    const dummyResults = [
      {
        airline: "El Al",
        departure: "08:30",
        arrival: "11:45",
        price: 210,
        cancellationPolicy: "ביטול תוך 24 שעות – ללא עלות",
      },
      {
        airline: "Arkia",
        departure: "14:20",
        arrival: "17:35",
        price: 195,
        cancellationPolicy: "75 דולר דמי ביטול",
      },
    ];

    setResults(dummyResults);
  };

  return (
    <div className="home-container">
      <h1>חיפוש טיסות</h1>
      <div className="form">
        <input
          type="text"
          placeholder="מ-"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="אל"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSearch}>חפש</button>
      </div>

      <FlightResults results={results} />
    </div>
  );
}

export default Home;
