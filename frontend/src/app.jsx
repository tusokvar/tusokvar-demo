// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FlightResults from './pages/FlightResults';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <Router>
      <ChatWidget />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<FlightResults />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
