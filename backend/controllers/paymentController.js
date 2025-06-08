const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
    const { amount, token } = req.body;
    console.log(process.env.STRIPE_SECRET_KEY);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // amount in cents
            currency: 'usd',
            payment_method: token,
            confirm: true,
            automatic_payment_methods: { enabled: true },
            return_url: "https://tusokvar-demo-1.onrender.com/",
        });

        res.json(paymentIntent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
