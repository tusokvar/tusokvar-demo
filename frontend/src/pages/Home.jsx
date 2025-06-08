import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchFlights } from '../utils/api';
import './Home.css';

const Home = () => {
  const [formData, setFormData] = useState({ origin: '', destination: '', date: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const flights = await searchFlights(formData);
      navigate('/flight-results', { state: { flights } });
    } catch (error) {
      alert("חלה שגיאה בחיפוש הטיסות. אנא נסה שוב מאוחר יותר.");
    }
  };

  return (
    <div className="home-container">
      <h1>טוסו כבר</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="origin" placeholder="מוצא" onChange={handleChange} required />
        <input type="text" name="destination" placeholder="יעד" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <button type="submit">חפש טיסות</button>
      </form>
    </div>
  );
};

export default Home;
