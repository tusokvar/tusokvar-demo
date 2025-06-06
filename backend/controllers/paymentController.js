const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
    const { amount, token } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // amount in cents
            currency: 'usd',
            payment_method: token,
            confirm: true
        });

        res.json(paymentIntent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
