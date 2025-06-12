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

  const handleSelectChange = (field) => (selectedOption) => {
    setPassengerDetails({
      ...passengerDetails,
      [field]: selectedOption,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passengerDetails.passportCountry || !passengerDetails.seatSelection) {
      alert('אנא מלא את כל השדות הדרושים');
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

        <div className="date-container">
          <label>תאריך לידה:</label>
          <input
            type="date"
            name="dateOfBirth"
            required
            onChange={handleChange}
          />
        </div>

        <input
          name="passportNumber"
          placeholder="מספר דרכון"
          required
          onChange={handleChange}
        />

        <Select
          options={countries}
          placeholder="בחר מדינה שהנפיקה את הדרכון"
          onChange={handleSelectChange('passportCountry')}
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

        <label className="label-select">בחר סוג כבודה:</label>
        <Select
          options={baggageOptions}
          defaultValue={baggageOptions[0]}
          onChange={handleSelectChange('baggageOption')}
        />

        <label className="label-select">בחר מושב:</label>
        <Select
          options={seatOptions}
          placeholder="בחר מושב"
          onChange={handleSelectChange('seatSelection')}
        />

        <button type="submit" className="submit-btn">
          המשך לתשלום
        </button>
      </form>
    </div>
  );
};

export default Booking;
