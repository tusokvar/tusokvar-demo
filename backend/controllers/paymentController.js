const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  const { amount, payment_method } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: 'eur', // <--- מותאם ל-EUR
      payment_method: payment_method,
      confirmation_method: 'automatic',
      confirm: true,
      automatic_payment_methods: { enabled: true },
      return_url: "https://tusokvar-demo-1.onrender.com/payment-success",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
