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
    // eslint-disable-next-line
  }, [navigate]);

  const fetchFlights = async ({ origin, destination, date }) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/flights`, {
        params: { origin, destination, date },
      });
      setFlights(res.data.flights || []);
      if (!res.data.flights || res.data.flights.length === 0) {
        setError("לא נמצאו טיסות בתאריכים שביקשת. נסה לחפש שוב.");
      }
    } catch (err) {
      setError("אירעה שגיאה בעת חיפוש הטיסות. נסה שנית.");
    }
    setLoading(false);
  };

  const handleSort = (key) => {
    setSortKey(key);
    setFlights((prevFlights) => {
      const sorted = [...prevFlights];
      if (key === "total") {
        sorted.sort((a, b) => a.price.total - b.price.total);
      }
      if (key === "airline") {
        sorted.sort((a, b) =>
          a.itineraries[0].segments[0].carrierCode.localeCompare(
            b.itineraries[0].segments[0].carrierCode
          )
        );
      }
      return sorted;
    });
  };

  const handleSelectFlight = (flight) => {
    localStorage.setItem("selected-flight", JSON.stringify(flight));
    navigate("/payment");
  };

  return (
    <div className="results-container">
      <div className="results-box">
        <h2 className="results-title">תוצאות חיפוש טיסות</h2>
        <div className="results-sort">
          <span>מיין לפי:</span>
          <button className="sort-btn" onClick={() => handleSort("total")}>מחיר</button>
          <button className="sort-btn" onClick={() => handleSort("airline")}>חברת תעופה</button>
        </div>
        {loading ? (
          <div className="results-loading">...טוען תוצאות</div>
        ) : error ? (
          <div className="results-error">{error}</div>
        ) : (
          <div className="flights-list">
            {flights.map((flight, idx) => (
              <div className="flight-card" key={idx}>
                <div>
                  <strong>
                    {flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[0].arrival.iataCode}
                  </strong>
                </div>
                <span className="airline">{flight.itineraries[0].segments[0].carrierCode}</span>
                <div className="price">
                  מחיר כולל: <b>{Number(flight.price.total).toLocaleString()} ₪</b>
                </div>
                <small className="small-info">
                  דמי טיפול: {Number(flight.price.vat).toLocaleString()} ₪
                </small>
                <button className="select-btn" onClick={() => handleSelectFlight(flight)}>
                  אישור ובחירת טיסה
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightResults;
