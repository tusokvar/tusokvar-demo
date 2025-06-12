import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useLocation } from 'react-router-dom';
import './Payment.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const currencyOptions = [
  { code: 'EUR', label: 'יורו (EUR)', flag: '🇪🇺' },
  { code: 'USD', label: 'דולר אמריקאי (USD)', flag: '🇺🇸' },
  { code: 'ILS', label: 'שקל ישראלי (ILS)', flag: '🇮🇱' },
];

const cardOptions = [
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'MasterCard' },
  { value: 'amex', label: 'American Express' },
  { value: 'diners', label: 'Diners Club' },
  { value: 'debit', label: 'Debit Card' },
];

const Payment = () => {
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };
  const [currency, setCurrency] = useState('EUR');
  const [cardType, setCardType] = useState('visa');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [idNumber, setIdNumber] = useState('');

  if (!amount || amount === 0) {
    return (
      <div className="payment-container">
        <h2>שגיאה בסיכום ההזמנה ⚠️</h2>
        <p>הסכום לתשלום לא נקבע כראוי.</p>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <h2>סיכום הזמנה 💳</h2>

      <div className="summary-box">
        <div className="summary-item">
          <span>סכום לתשלום:</span>
          <span className="total-amount">{amount.toFixed(2)} {currency}</span>
        </div>
      </div>

      <div className="payment-details">
        <div className="detail-group">
          <label>בחר מטבע לתשלום:</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {currencyOptions.map(({ code, label, flag }) => (
              <option key={code} value={code}>{flag} {label}</option>
            ))}
          </select>
        </div>

        <div className="detail-group">
          <label>בחר סוג כרטיס:</label>
          <select value={cardType} onChange={(e) => setCardType(e.target.value)}>
            {cardOptions.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="detail-group">
          <label>מספר כרטיס אשראי:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="מספר כרטיס"
            required
          />
        </div>

        <div className="detail-group">
          <label>תוקף כרטיס (MM/YY):</label>
          <input
            type="text"
            value={cardExpiry}
            onChange={(e) => setCardExpiry(e.target.value)}
            placeholder="MM/YY"
            required
          />
        </div>

        <div className="detail-group">
          <label>3 ספרות בגב הכרטיס (CVC):</label>
          <input
            type="text"
            value={cardCVC}
            onChange={(e) => setCardCVC(e.target.value)}
            placeholder="CVC"
            required
          />
        </div>

        <div className="detail-group">
          <label>מיקוד:</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="מיקוד"
            required
          />
        </div>

        <div className="detail-group">
          <label>מספר תעודת זהות:</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            placeholder="הזן תעודת זהות"
            required
          />
        </div>

        <div className="detail-group">
          <label>מייל לקבלת חשבונית:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="הזן כתובת מייל"
            required
          />
        </div>
      </div>

      <div className="checkout-form-container">
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} currency={currency} cardType={cardType} idNumber={idNumber} />
        </Elements>
      </div>

      <button className="order-btn">הזמן עכשיו</button>
    </div>
  );
};

export default Payment;
