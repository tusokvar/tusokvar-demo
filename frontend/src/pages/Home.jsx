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
    returnDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const flights = await api.post('/flights/search', formData);
      navigate('/flight-results', { state: formData });
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  return (
    <div className="home-container">
      <form onSubmit={handleSubmit}>
        <input name="origin" placeholder="מוצא" onChange={handleChange} />
        <input name="destination" placeholder="יעד" onChange={handleChange} />
        <input name="departureDate" type="date" onChange={handleChange} />
        <input name="returnDate" type="date" onChange={handleChange} />
        <button type="submit">חפש טיסות</button>
      </form>
    </div>
  );
};

export default Home;
