// frontend/src/pages/Payment.jsx
import { useLocation } from 'react-router-dom';
import api from '../utils/api';

const Payment = () => {
  const { state } = useLocation();

  const handlePayment = async () => {
    try {
      const res = await api.post('/payments/create', state);
      window.location.href = res.data.url; // Stripe Checkout URL
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="payment-container">
      <h2>סיכום הזמנה</h2>
      <p>מחיר לתשלום: {state.flight.price.total} {state.flight.price.currency}</p>
      <button onClick={handlePayment}>שלם עכשיו</button>
    </div>
  );
};

export default Payment;
