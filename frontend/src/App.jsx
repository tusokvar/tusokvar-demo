import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Payment from './pages/Payment';
import FlightResults from './pages/FlightResults';

import './pages/Home.css';
import './pages/Payment.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/results" element={<FlightResults />} />
      </Routes>
    </Router>
  );
}

export default App;
