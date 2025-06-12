import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FlightResults from './pages/FlightResults';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import Booking from './pages/Booking';
import FlightSearch from './pages/FlightSearch';
import ChatWidget from './components/chatwidget';

const App = () => (
  <Router>
    <ChatWidget />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flight-search" element={<FlightSearch />} />
      <Route path="/flight-results" element={<FlightResults />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
    </Routes>
  </Router>
);

export default App;
