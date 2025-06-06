import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import FlightResults from "./pages/FlightResults.jsx";
import Payment from "./pages/Payment.jsx";
import ChatWidget from "./components/chatwidget.jsx";
import "./pages/Home.css";
import "./pages/FlightResults.css";
import "./pages/Payment.css";
import "./components/chatwidget.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container" dir="rtl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<FlightResults />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <ChatWidget />
      </div>
    </BrowserRouter>
  );
};

export default App;
