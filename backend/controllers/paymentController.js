const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');

exports.processPayment = async (req, res) => {
  const { amount, paymentMethodId, currency } = req.body;

  try {
    // קבלת נתוני המרה בצורה נכונה
    const exchangeRates = await axios.get('https://api.exchangerate.host/latest?base=EUR&symbols=USD,ILS');

    if (!exchangeRates.data || !exchangeRates.data.rates) {
      throw new Error('Exchange rate API failed');
    }

    const rates = exchangeRates.data.rates;

    let convertedAmount = amount;

    if (currency === 'USD') {
      if (!rates.USD) throw new Error('USD rate missing');
      convertedAmount = amount * rates.USD;
    } else if (currency === 'ILS') {
      if (!rates.ILS) throw new Error('ILS rate missing');
      convertedAmount = amount * rates.ILS;
    }

    console.log('Original Amount (EUR):', amount);
    console.log('Currency:', currency);
    console.log('Converted Amount:', convertedAmount);

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
