const { sendEmail } = require('./emailService');

exports.sendBookingConfirmation = async (req, res) => {
    const { email, bookingDetails } = req.body;

    try {
        await sendEmail(email, "Booking Confirmation", bookingDetails);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error });
    }
};
