// src/pages/Home.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/results', { state: formData });
  };

  return (
    <div className="home-container">
      <h1 className="home-title">טוסו כבר ✈</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          name="origin"
          placeholder="מוצא"
          required
          onChange={handleChange}
        />
        <input
          name="destination"
          placeholder="יעד"
          required
          onChange={handleChange}
        />
        <input
          type="date"
          name="departureDate"
          required
          onChange={handleChange}
        />
        <input
          type="date"
          name="returnDate"
          onChange={handleChange}
        />
        <input
          type="number"
          name="adults"
          min="1"
          defaultValue="1"
          onChange={handleChange}
        />
        <button type="submit">חפש טיסות</button>
      </form>
    </div>
  );
};

export default Home;
