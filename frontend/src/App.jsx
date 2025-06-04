import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Payment from './Payment';
import FlightResults from './FlightResults';

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
