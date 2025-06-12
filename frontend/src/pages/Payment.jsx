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

const Payment = () => {
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };
  const [currency, setCurrency] = useState('EUR');

  if (!amount || amount === 0) {
    return (
      <div className="payment-container">
        <h2>שגיאה בסיכום ההזמנה</h2>
        <p>הסכום לתשלום לא נקבע כראוי.</p>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <h2>סיכום הזמנה</h2>
      <p>{amount.toFixed(2)} EUR</p>

      <div className="currency-selector">
        <label>בחר מטבע לתשלום:</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {currencyOptions.map(({ code, label, flag }) => (
            <option key={code} value={code}>
              {flag} {label}
            </option>
          ))}
        </select>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} currency={currency} />
      </Elements>
    </div>
  );
};

export default Payment;
