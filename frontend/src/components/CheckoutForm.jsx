import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import api from '../utils/api';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error("Stripe Elements Error:", error);
      return;
    }

    try {
      const response = await api.post('/payments', {
        amount,
        paymentMethodId: paymentMethod.id, // זה ה-ID הנדרש
      });

      if (response.data.success) {
        alert("התשלום הצליח!");
      } else {
        alert("התשלום נכשל: " + response.data.error);
      }
    } catch (err) {
      console.error("Server Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        שלם עכשיו
      </button>
    </form>
  );
};

export default CheckoutForm;
