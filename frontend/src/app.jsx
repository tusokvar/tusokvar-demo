import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FlightSearch from './pages/FlightSearch';
import FlightResults from './pages/FlightResults';
import Payment from './pages/Payment';
import Booking from './pages/Booking';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <Router>
      <ChatWidget />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<FlightSearch />} />
        <Route path="/results" element={<FlightResults />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;
