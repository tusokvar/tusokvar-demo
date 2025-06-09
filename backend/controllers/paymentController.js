const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  const { amount, paymentMethodId } = req.body;

  try {
 const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(amount * 100),
  currency: 'eur',
  payment_method: paymentMethodId,
  confirmation_method: 'automatic',
  confirm: true,
  return_url: 'https://tusokvar-demo-1.onrender.com/payment-success',
  automatic_payment_methods: {
    enabled: true,
    allow_redirects: 'always' // יאפשר ל־Stripe לבצע Redirect במידה ודרוש אימות נוסף
  }
});
    res.json({ success: true, paymentIntent });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
