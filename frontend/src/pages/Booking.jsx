// src/pages/Booking.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Select from 'react-select';
import countries from '../utils/countries';
import './Booking.css';

const seatOptions = Array.from({ length: 30 }, (_, i) => ({
  value: `Seat ${i + 1}`,
  label: `מושב ${i + 1}`,
}));

const baggageOptions = [
  { value: 'none', label: 'ללא' },
  { value: 'trolley', label: 'טרולי (תיק יד)' },
  { value: 'checked', label: 'מזוודה (כבודה גדולה)' },
  { value: 'both', label: 'טרולי + מזוודה' },
];

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
    baggageOption: baggageOptions[0],
    seatSelection: null,
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

  const handleBaggageChange = (selectedOption) => {
    setPassengerDetails({
      ...passengerDetails,
      baggageOption: selectedOption,
    });
  };

  const handleSeatChange = (selectedOption) => {
    setPassengerDetails({
      ...passengerDetails,
      seatSelection: selectedOption,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passengerDetails.passportCountry) {
      alert('אנא בחר מדינה שהנפיקה את הדרכון');
      return;
    }

    if (!passengerDetails.seatSelection) {
      alert('אנא בחר מושב');
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

        <label style={{ marginTop: '20px' }}>בחר סוג כבודה:</label>
        <Select
          options={baggageOptions}
          defaultValue={baggageOptions[0]}
          onChange={handleBaggageChange}
        />

        <label style={{ marginTop: '20px' }}>בחר מושב:</label>
        <Select
          options={seatOptions}
          placeholder="בחר מושב"
          onChange={handleSeatChange}
        />

        <button type="submit" style={{ marginTop: '20px' }}>
          המשך לתשלום
        </button>
      </form>
    </div>
  );
};

export default Booking;

