import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { BACKEND_URI } from '../utils/config';
import { useNavigate } from 'react-router-dom';
import './CheckoutForm.css';

const CheckoutForm = ({ amount, currency, idNumber, email, postalCode }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(amount);

  useEffect(() => {
    const fetchConversion = async () => {
      if (currency !== 'EUR') {
        try {
          const res = await axios.post(`${BACKEND_URI}/currency/convert`, {
            amount,
            fromCurrency: 'EUR',
            toCurrency: currency,
          });
          if (res.data.success) {
            setConvertedAmount(res.data.convertedAmount);
          } else {
            setErrorMsg(res.data.error);
          }
        } catch {
          setErrorMsg('שגיאה בקבלת שערי מטבע.');
        }
      } else {
        setConvertedAmount(amount);
      }
    };

    fetchConversion();
  }, [amount, currency]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMsg('');

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email,
        address: { postal_code: postalCode },
      },
    });

    if (error) {
      setErrorMsg(error.message || 'שגיאה בפרטי הכרטיס.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URI}/payments`, {
        amount: convertedAmount,
        currency,
        paymentMethodId: paymentMethod.id,
        idNumber,
        email,
      });

      if (response.data.success) {
        navigate('/payment-success');
      } else {
        setErrorMsg(response.data.error || 'התשלום נכשל, אנא נסה שוב.');
      }
    } catch (error) {
      setErrorMsg('שגיאת שרת, אנא נסה מאוחר יותר.');
    }

    setLoading(false);
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <label className="card-label">פרטי כרטיס אשראי:</label>
      <div className="card-element-container">
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>

      {errorMsg && <p className="error-msg">{errorMsg}</p>}

      <button className="submit-btn" type="submit" disabled={!stripe || loading}>
        {loading ? 'מבצע תשלום...' : 'הזמן עכשיו'}
      </button>
    </form>
  );
};

export default CheckoutForm;
