// frontend/src/pages/Booking.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [passengerDetails, setPassengerDetails] = useState({
    fullName: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    setPassengerDetails({
      ...passengerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { ...state, passengerDetails } });
  };

  return (
    <div className="booking-container">
      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="שם מלא באנגלית" required onChange={handleChange} />
        <input name="phone" placeholder="טלפון" required onChange={handleChange} />
        <input name="email" type="email" placeholder="אימייל" required onChange={handleChange} />
        <button type="submit">המשך לתשלום</button>
      </form>
    </div>
  );
};

export default Booking;
