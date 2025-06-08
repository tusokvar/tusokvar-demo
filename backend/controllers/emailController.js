// backend/controllers/emailController.js
const { sendEmail } = require('./emailService');

exports.sendBookingConfirmation = async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    await sendEmail(to, subject, html);
    res.json({ success: true, msg: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
