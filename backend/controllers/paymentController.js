const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');

const calculateFinalPrice = (basePrice, discountCode = null) => {
  const profitMargin = parseFloat(process.env.DEFAULT_PROFIT_MARGIN || 10);
  const fee = parseFloat(process.env.TRANSACTION_FEE_PERCENTAGE || 2.3);

  let discount = 0;
  if (discountCode === 'TUSU5') discount = 5;
  if (discountCode === 'TUSU15') discount = 15;

  const priceWithProfit = basePrice * (1 + (profitMargin / 100));
  const priceAfterDiscount = priceWithProfit * (1 - (discount / 100));
  const finalPrice = priceAfterDiscount * (1 + (fee / 100));

  return Math.round(finalPrice * 100) / 100; // לשני ספרות אחרי הנקודה
};

exports.handlePayment = async (req, res) => {
  try {
    const { basePrice, currency, token, discountCode } = req.body;

    if (!basePrice || !currency || !token) {
      return res.status(400).json({ error: 'Missing payment information' });
    }

    const finalAmount = calculateFinalPrice(basePrice, discountCode);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount * 100), // סנט
      currency,
      payment_method: token,
      confirm: true,
    });

    // בעתיד: שלח כרטיס טיסה ומייל ללקוח פה

    res.status(200).json({
      message: 'Payment successful',
      amount_charged: finalAmount,
      payment_id: paymentIntent.id,
    });

  } catch (error) {
    console.error('Payment Error:', error);
    res.status(500).json({ error: 'Payment failed' });
  }
};
