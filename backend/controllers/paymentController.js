// backend/controllers/paymentController.js
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create a Stripe payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Public
const createPaymentIntent = async (req, res) => {
  const { amount, currency = 'usd' } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency
    });
    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return res.status(500).json({ message: 'Error creating payment intent' });
  }
};

module.exports = { createPaymentIntent };
