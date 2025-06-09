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
    const response = await axios.post(`${BACKEND_URI}/api/payments`, {
      amount,
      paymentMethodId: paymentMethod.id,
    });

    const { clientSecret } = response.data;

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret);

    if (confirmError) {
      console.error('Confirm Card Payment Error:', confirmError);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      window.location.href = '/payment-success';
    }

  } catch (error) {
    console.error('Server Error:', error);
  }
};
