const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  const { amount, payment_method } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'eur',  // שנה ל־eur אם זה מה שאתה מציג באתר
      payment_method: payment_method,
      confirm: true,
      return_url: "https://tusokvar-demo-1.onrender.com/",
      automatic_payment_methods: { enabled: true } // שימוש בשיטה אוטומטית בלבד
    });

    res.json(paymentIntent);
  } catch (error) {
    console.error('Stripe Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
