import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useLocation } from 'react-router-dom';
import './Payment.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };

  return (
    <div className="payment-container">
      <h2>סיכום הזמנה</h2>
      <p>{amount.toFixed(2)} מחיר לתשלום EUR</p>

      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
};

export default Payment;
