import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      navigate('/flight-results', { state: formData });
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">טוסו כבר ✈️</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input 
          name="origin" 
          placeholder="מוצא (לדוגמה: TLV)" 
          required 
          onChange={handleChange} 
        />

        <input 
          name="destination" 
          placeholder="יעד (לדוגמה: JFK)" 
          required 
          onChange={handleChange} 
        />

        <label>תאריך יציאה:</label>
        <input 
          name="departureDate" 
          type="date" 
          required 
          onChange={handleChange} 
        />

        <label>תאריך חזרה (אופציונלי):</label>
        <input 
          name="returnDate" 
          type="date" 
          onChange={handleChange} 
        />

        <label>מספר נוסעים:</label>
        <input 
          name="passengers" 
          type="number" 
          min="1" 
          value={formData.passengers}
          onChange={handleChange} 
        />

        <button type="submit" className="search-btn">חפש טיסות</button>
      </form>
    </div>
  );
};

export default Home;
