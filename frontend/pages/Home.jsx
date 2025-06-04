import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="main-title">טוסו כבר</h1>
      <p className="subtitle">הזמינו טיסות וחופשות בלי הפתעות</p>
      
      <div className="search-box">
        <input type="text" placeholder="יעד" />
        <input type="date" placeholder="תאריך יציאה" />
        <input type="date" placeholder="תאריך חזרה" />
        <button>חפש טיסות</button>
      </div>

      <p className="chat-hint">יש לך שאלה? אנחנו כאן! 👇</p>
    </div>
  );
};

export default Home;
