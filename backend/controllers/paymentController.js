const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');

exports.processPayment = async (req, res) => {
  const { amount, paymentMethodId, currency } = req.body;

  try {
    const exchangeRates = await axios.get('https://api.exchangerate.host/latest?base=EUR&symbols=USD,ILS');
    const rates = exchangeRates.data.rates;

    let convertedAmount = amount;

    if (currency === 'USD') convertedAmount = amount * rates.USD;
    else if (currency === 'ILS') convertedAmount = amount * rates.ILS;
    console.log('Received amount:', amount);
    console.log('Currency:', currency);
    console.log('Converted amount:', convertedAmount);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(convertedAmount * 100),
      currency: currency.toLowerCase(),
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
      return_url: 'https://tusokvar-demo.onrender.com/payment-success'
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error('Stripe or Exchange Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
