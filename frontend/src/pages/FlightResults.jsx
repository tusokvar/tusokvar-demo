import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import "./FlightResults.css";

const FlightResults = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("total");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const search = JSON.parse(localStorage.getItem("flight-search"));
    if (!search) {
      navigate("/");
      return;
    }
    fetchFlights(search);
  }, [navigate]);

  const fetchFlights = async ({ origin, destination, date }) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/flights`, {
        params: { origin, destination, date }
      });
      setFlights(res.data);
    } catch (err) {
      setError("לא נמצאו טיסות או שגיאה בשרת");
    }
    setLoading(false);
  };

  const handleSort = (key) => {
    setSortKey(key);
    setFlights([...flights].sort((a, b) => {
      if (!a.price || !b.price) return 0;
      if (key === "total") return a.price.total - b.price.total;
      if (key === "airline") return a.itineraries[0].segments[0].carrierCode.localeCompare(b.itineraries[0].segments[0].carrierCode);
      return 0;
    }));
  };

  const handleSelectFlight = (flight) => {
    localStorage.setItem("selected-flight", JSON.stringify(flight));
    navigate("/payment");
  };

  return (
    <div className="results-container">
      <h2>תוצאות חיפוש טיסות</h2>
      <div className="results-sort">
        <span>מיין לפי:</span>
        <button onClick={() => handleSort("total")}>מחיר</button>
        <button onClick={() => handleSort("airline")}>חברת תעופה</button>
      </div>
      {loading ? <div>טוען תוצאות...</div> : error ? <div className="error">{error}</div> : (
        <div className="flights-list">
          {flights.map((flight, idx) => (
            <div className="flight-card" key={idx}>
              <div>
                <strong>
                  {flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[0].arrival.iataCode}
                </strong>
                <span className="airline">
                  {flight.itineraries[0].segments[0].carrierCode}
                </span>
              </div>
              <div>
                <span>מחיר כולל: <b>{Number(flight.price.total).toLocaleString()} ₪</b></span>
              </div>
              <div>
                <small>דמי טיפול: {Number(flight.price.markup).toLocaleString()} ₪ | מע״מ: {Number(flight.price.vat).toLocaleString()} ₪</small>
              </div>
              <button onClick={() => handleSelectFlight(flight)}>המשך לתשלום</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightResults;
