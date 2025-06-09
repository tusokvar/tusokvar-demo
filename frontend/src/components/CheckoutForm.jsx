import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { BACKEND_URI } from '../utils/config';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Stripe error:', error);
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URI}/payments`, {
        amount,
        paymentMethodId: paymentMethod.id,
      });

      if (response.data.success) {
        console.log('התשלום בוצע בהצלחה:', response.data.paymentIntent);
        window.location.href = '/payment-success'; 
      } else {
        console.error('התשלום נכשל:', response.data.error);
      }
    } catch (error) {
      console.error('Server Error:', error);
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
