const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  const { amount, paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'eur',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: { enabled: true },
    });

    res.json({ success: true, paymentIntent });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
