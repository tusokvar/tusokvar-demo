import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../utils/api';

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
      console.error(error);
      return;
    }

    const response = await api.post('/payments', {
      amount,
      paymentMethodId: paymentMethod.id,
    });

    if (response.data.success) {
      console.log('התשלום בוצע בהצלחה!', response.data.paymentIntent);
    } else {
      console.error('התשלום נכשל:', response.data.error);
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
