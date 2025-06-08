import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/FlightSearch.css';

const FlightSearch = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/flights/search`, formData);
      navigate('/results', { state: { flights: response.data } });
    } catch (error) {
      console.error('Error searching flights:', error);
      alert('אירעה שגיאה בעת החיפוש. נא לנסות שוב.');
    }
  };

  return (
    <div className="flight-search-container">
      <h1>חיפוש טיסות</h1>
      <form onSubmit={handleSubmit} className="flight-form">
        <input 
          type="text" 
          name="from" 
          placeholder="מוצא" 
          value={formData.from} 
          onChange={handleChange} 
          required
        />
        <input 
          type="text" 
          name="to" 
          placeholder="יעד" 
          value={formData.to} 
          onChange={handleChange} 
          required
        />
        <input 
          type="date" 
          name="departureDate" 
          placeholder="תאריך יציאה" 
          value={formData.departureDate} 
          onChange={handleChange} 
          required
        />
        <input 
          type="date" 
          name="returnDate" 
          placeholder="תאריך חזרה" 
          value={formData.returnDate} 
          onChange={handleChange}
        />
        <input 
          type="number" 
          name="passengers" 
          placeholder="מספר נוסעים" 
          min="1"
          value={formData.passengers} 
          onChange={handleChange} 
          required
        />
        <button type="submit">חיפוש</button>
      </form>
    </div>
  );
};

export default FlightSearch;
