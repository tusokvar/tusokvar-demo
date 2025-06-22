const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/convert', async (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.body;

  try {
    const apiKey = process.env.EXCHANGE_API_KEY;
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const rate = response.data.rates[toCurrency];

    if (!rate) {
      return res.status(400).json({ success: false, error: 'Unsupported currency' });
    }

    const convertedAmount = (amount * rate).toFixed(2);
    res.json({ success: true, convertedAmount });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Exchange rate API failed' });
  }
});

module.exports = router;
