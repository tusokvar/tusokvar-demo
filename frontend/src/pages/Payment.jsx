// frontend/src/pages/Payment.jsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useLocation } from 'react-router-dom';
import './Payment.css';

const stripePromise = loadStripe("pk_test_51RWDoqPqIZi53O4hG9Is3syaykmB6hNKosGn8xpA1TVGwFackOPwFE9FRAk6HVwgdBJ8WJPnz2o6sxBoPDA4FXQc00DZoVsh1T");

const Payment = () => {
  const location = useLocation();
  const { flight } = location.state || {};

  const [loading, setLoading] = useState(false);

  return (
    <div className="payment-container">
      <h2>סיכום הזמנה</h2>
      {flight ? (
        <p>
          מחיר לתשלום: {flight.price.total} {flight.price.currency}
        </p>
      ) : (
        <p>פרטי הטיסה לא נמצאו, אנא חזור לעמוד החיפוש.</p>
      )}

      {flight && (
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={flight.price.total} setLoading={setLoading} />
        </Elements>
      )}

      {loading && <p>מבצע תשלום, נא להמתין...</p>}
    </div>
  );
};

export default Payment;
