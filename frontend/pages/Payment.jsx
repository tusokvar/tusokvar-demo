import React, { useState } from 'react';
import './Payment.css';

const Payment = () => {
  const [coupon, setCoupon] = useState('');
  const [price, setPrice] = useState(500); // לדוגמה
  const [finalPrice, setFinalPrice] = useState(price);
  const [confirmation, setConfirmation] = useState(false);

  const applyCoupon = () => {
    let discount = 0;
    if (coupon === 'TUSU5') discount = 0.05;
    else if (coupon === 'TUSU15') discount = 0.15;

    let updated = price * (1 - discount);
    updated *= 1.023; // תוספת סליקה
    updated *= 1.17;  // מע"מ

    setFinalPrice(updated.toFixed(2));
  };

  const handlePayment = () => {
    setConfirmation(true);
    // תהליך תשלום יתווסף כאן
  };

  return (
    <div className="payment-container">
      <h2>סיכום הזמנה</h2>
      <p>טיסה לרומא - 17.6 עד 22.6</p>
      <p>מחיר לפני מע"מ וסליקה: ${price}</p>

      <input
        type="text"
        placeholder="קוד קופון"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />
      <button onClick={applyCoupon}>הפעל קופון</button>

      <h3>סה״כ לתשלום: {finalPrice} ₪</h3>
      <button className="pay-btn" onClick={handlePayment}>לתשלום</button>

      {confirmation && (
        <p className="success-msg">ההזמנה התקבלה! מייל עם כרטיס טיסה נשלח אליך.</p>
      )}
    </div>
  );
};

export default Payment;
