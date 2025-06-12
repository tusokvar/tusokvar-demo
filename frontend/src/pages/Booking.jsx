// src/pages/Booking.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Select from 'react-select';
import countries from '../utils/countries';
import './Booking.css';

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [passengerDetails, setPassengerDetails] = useState({
    fullName: '',
    dateOfBirth: '',
    passportNumber: '',
    passportCountry: null,
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    setPassengerDetails({
      ...passengerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountryChange = (selectedOption) => {
    setPassengerDetails({
      ...passengerDetails,
      passportCountry: selectedOption,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passengerDetails.passportCountry) {
      alert('אנא בחר מדינה שהנפיקה את הדרכון');
      return;
    }

    navigate('/payment', { state: { ...state, passengerDetails } });
  };

  return (
    <div className="booking-container">
      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="שם מלא באנגלית (כמו בדרכון)"
          required
          onChange={handleChange}
        />

        <input
          type="date"
          name="dateOfBirth"
          placeholder="תאריך לידה"
          required
          onChange={handleChange}
        />

        <input
          name="passportNumber"
          placeholder="מספר דרכון"
          required
          onChange={handleChange}
        />

        <Select
          options={countries}
          placeholder="בחר מדינה שהנפיקה את הדרכון"
          onChange={handleCountryChange}
          required
        />

        <input
          name="phone"
          placeholder="טלפון"
          required
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="אימייל"
          required
          onChange={handleChange}
        />

        <button type="submit">המשך לתשלום</button>
      </form>
    </div>
  );
};

export default Booking;
