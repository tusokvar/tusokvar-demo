import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import airports from '../utils/airports';
import './FlightSearch.css';

const FlightSearch = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from: null,
    to: null,
    departureDate: '',
    returnDate: '',
    passengers: 1,
  });

  const handleSelectChange = (selectedOption, action) => {
    setFormData({ ...formData, [action.name]: selectedOption });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.from || !formData.to) {
      alert('יש לבחור מוצא ויעד מתוך הרשימה בלבד.');
      return;
    }

    try {
      const searchParams = {
        originLocationCode: formData.from.value,
        destinationLocationCode: formData.to.value,
        departureDate: formData.departureDate,
        returnDate: formData.returnDate,
        adults: formData.passengers,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/flights/search`,
        searchParams
      );

      navigate('/flight-results', { state: searchParams });
    } catch (error) {
      console.error('Error searching flights:', error);
      alert('אירעה שגיאה בעת החיפוש. נא לנסות שוב.');
    }
  };

  return (
    <div className="flight-search-container">
      <h1>חיפוש טיסות ✈️</h1>
      <form onSubmit={handleSubmit} className="flight-form">
        <label>מוצא:</label>
        <Select
          options={airports}
          placeholder="בחר שדה תעופה מוצא"
          onChange={handleSelectChange}
          name="from"
          isSearchable
          required
        />

        <label>יעד:</label>
        <Select
          options={airports}
          placeholder="בחר שדה תעופה יעד"
          onChange={handleSelectChange}
          name="to"
          isSearchable
          required
        />

        <label>תאריך יציאה:</label>
        <input
          type="date"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleChange}
          required
        />

        <label>תאריך חזרה (אופציונלי):</label>
        <input
          type="date"
          name="returnDate"
          value={formData.returnDate}
          onChange={handleChange}
        />

        <label>מספר נוסעים:</label>
        <input
          type="number"
          name="passengers"
          min="1"
          value={formData.passengers}
          onChange={handleChange}
          required
        />

        <button type="submit">חפש טיסות</button>
      </form>
    </div>
  );
};

export default FlightSearch;
