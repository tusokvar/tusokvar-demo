import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { API_URL } from "../config";

const Container = styled.div`
  background: linear-gradient(120deg, #101522 80%, #39c0ed 100%);
  min-height: 100vh;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultsBox = styled.div`
  background: #23293a;
  color: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.17);
  padding: 30px 18px 24px 18px;
  max-width: 650px;
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #18b6f6;
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 2.1rem;
  margin-bottom: 16px;
`;

const SortBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 16px;
`;

const SortButton = styled.button`
  background: #18b6f6;
  color: #fff;
  border: none;
  border-radius: 22px;
  padding: 7px 22px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: #43e0f6;
  }
`;

const FlightList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const FlightCard = styled.div`
  background: #181f2e;
  border-radius: 12px;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.10);
  padding: 18px 18px 12px 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Airline = styled.span`
  color: #64d6ff;
  font-size: 1.03rem;
  font-weight: 500;
`;

const Price = styled.div`
  font-size: 1.18rem;
  color: #fff;
  margin: 4px 0 3px 0;
  font-weight: 600;
`;

const Small = styled.small`
  color: #aaa;
`;

const SelectButton = styled.button`
  background: linear-gradient(90deg,#18b6f6 65%, #4a98f5 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 7px 19px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 6px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: linear-gradient(90deg, #4a98f5 65%, #18b6f6 100%);
  }
`;

const Error = styled.div`
  color: #ff3d57;
  background: #fff5f7;
  border-radius: 8px;
  padding: 13px;
  margin: 24px 0;
  font-weight: 600;
`;

const Loading = styled.div`
  color: #18b6f6;
  font-size: 1.3rem;
  margin: 24px 0;
`;

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
    <Container>
      <ResultsBox>
        <Title>תוצאות חיפוש טיסות</Title>
        <SortBar>
          <span>מיין לפי:</span>
          <SortButton onClick={() => handleSort("total")}>מחיר</SortButton>
          <SortButton onClick={() => handleSort("airline")}>חברת תעופה</SortButton>
        </SortBar>
        {loading ? (
          <Loading>...טוען תוצאות</Loading>
        ) : error ? (
          <Error>{error}</Error>
        ) : (
          <FlightList>
            {flights.map((flight, idx) => (
              <FlightCard key={idx}>
                <div>
                  <strong>
                    {flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[0].arrival.iataCode}
                  </strong>
                </div>
                <Airline>{flight.itineraries[0].segments[0].carrierCode}</Airline>
                <Price>מחיר כולל: <b>{Number(flight.price.total).toLocaleString()} ₪</b></Price>
                <Small>
                  דמי טיפול: {Number(flight.price.vat).toLocaleString()} ₪
                </Small>
                <SelectButton onClick={() => handleSelectFlight(flight)}>אישור ובחירת טיסה</SelectButton>
              </FlightCard>
            ))}
          </FlightList>
        )}
      </ResultsBox>
    </Container>
  );
};

export default FlightResults;
