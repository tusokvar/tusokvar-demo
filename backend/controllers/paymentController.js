const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');

exports.processPayment = async (req, res) => {
  const { amount, paymentMethodId, currency } = req.body;

  try {
    const apiKey = process.env.EXCHANGE_API_KEY;
    const exchangeRates = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`);

    if (!exchangeRates.data || !exchangeRates.data.conversion_rates) {
      throw new Error('Exchange rate API failed');
    }

    const rates = exchangeRates.data.conversion_rates;

    if (!rates[currency]) {
      throw new Error(`${currency} rate missing`);
    }

    const convertedAmount = amount * rates[currency];

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
    console.error('Stripe or Exchange Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getExchangeRate = async (req, res) => {
  const { from, to } = req.query;

  try {
    const apiKey = process.env.EXCHANGE_API_KEY;
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`);

    if (!response.data || !response.data.conversion_rates || !response.data.conversion_rates[to]) {
      throw new Error('Exchange rate fetch failed.');
    }

    const rate = response.data.conversion_rates[to];

    res.json({ success: true, rate });
  } catch (error) {
    console.error('Exchange rate fetch error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
