import React, { useState } from "react";

const Home = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [coupon, setCoupon] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://tusukvar-backend.onrender.com/api/flights/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, date }),
      });

      const data = await response.json();

      if (data.flights) {
        setResults(data.flights);
      } else {
        setResults([]);
        setError("לא נמצאו טיסות.");
      }
    } catch (err) {
      console.error("שגיאה:", err);
      setError("שגיאה בטעינת טיסות.");
    }

    setLoading(false);
  };

  const calculatePrice = (basePrice) => {
    const profitPercent = 10;
    const vat = 0.17;
    const cardFee = 0.023;
    const discount = coupon === "TUSU5" ? 0.05 : coupon === "TUSU15" ? 0.15 : 0;

    let price = basePrice * (1 + profitPercent / 100 + vat + cardFee);
    price = price * (1 - discount);

    return price.toFixed(2);
  };

  return (
    <div className="home">
      <h2>חיפוש טיסות</h2>
      <div>
        <input
          type="text"
          placeholder="מ- (מדינה או עיר)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="אל (מדינה או עיר)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="קוד קופון (אם יש)"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button onClick={handleSearch}>חפש טיסות</button>
      </div>

      {loading && <p>טוען תוצאות...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="results">
        {results.map((flight, index) => (
          <div key={index} className="flight-card">
            <p><strong>חברה:</strong> {flight.airline}</p>
            <p><strong>יציאה:</strong> {flight.departureTime}</p>
            <p><strong>נחיתה:</strong> {flight.arrivalTime}</p>
            <p><strong>מחיר סופי:</strong> ${calculatePrice(flight.basePrice)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
