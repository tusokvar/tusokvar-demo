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

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      return;
    }

    // שליחת התשלום לשרת
    const response = await api.post('/payments', {
      paymentMethodId: paymentMethod.id,
      amount,
    });

    if (response.data.success) {
      alert('התשלום בוצע בהצלחה!');
    } else {
      alert('אירעה תקלה בתשלום');
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
