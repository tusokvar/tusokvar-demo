import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URI } from '../utils/config';
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
  const originalAmount = location.state?.amount || 0;
  const [currency, setCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(originalAmount);
  const [cardType, setCardType] = useState('visa');
  const [postalCode, setPostalCode] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        if (currency === 'EUR') {
          setConvertedAmount(originalAmount);
        } else {
          const res = await axios.get(`${BACKEND_URI}/payments/exchange-rate`, {
            params: { from: 'EUR', to: currency },
          });

          if (res.data.success) {
            setConvertedAmount(originalAmount * res.data.rate);
          } else {
            throw new Error('Exchange rate fetch failed.');
          }
        }
      } catch (error) {
        console.error('Exchange Error:', error);
        setConvertedAmount(originalAmount);
      }
    };

    fetchConversionRate();
  }, [currency, originalAmount]);

  if (!originalAmount || originalAmount === 0) {
    return (
      <div className="payment-container">
        <h2>שגיאה בסיכום ההזמנה ⚠</h2>
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
          <span className="total-amount">{convertedAmount.toFixed(2)} {currency}</span>
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
          <label>סוג כרטיס:</label>
          <select value={cardType} onChange={(e) => setCardType(e.target.value)}>
            {cardOptions.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="detail-group">
          <label>מיקוד:</label>
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="מיקוד" required />
        </div>

        <div className="detail-group">
          <label>מספר תעודת זהות:</label>
          <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} placeholder="תעודת זהות" required />
        </div>

        <div className="detail-group">
          <label>מייל לקבלת חשבונית:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="דוא״ל" required />
        </div>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm
          amount={convertedAmount}
          currency={currency}
          cardType={cardType}
          postalCode={postalCode}
          idNumber={idNumber}
          email={email}
        />
      </Elements>

      <button className="order-btn">הזמן עכשיו</button>
    </div>
  );
};

export default Payment;
