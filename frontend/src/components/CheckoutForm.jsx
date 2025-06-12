import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { BACKEND_URI } from '../utils/config';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMsg('');

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Stripe error:', error);
      setErrorMsg(error.message || 'שגיאה בפרטי הכרטיס.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URI}/payments`, {
        amount,
        paymentMethodId: paymentMethod.id,
      });

      if (response.data.success) {
        console.log('התשלום בוצע בהצלחה:', response.data.paymentIntent);
        navigate('/payment-success');
      } else {
        console.error('התשלום נכשל:', response.data.error);
        setErrorMsg(response.data.error || 'התשלום נכשל, אנא נסה שוב.');
      }
    } catch (error) {
      console.error('Server Error:', error);
      setErrorMsg('שגיאת שרת, אנא נסה מאוחר יותר.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'מבצע תשלום...' : 'שלם עכשיו'}
      </button>
    </form>
  );
};

export default CheckoutForm;
