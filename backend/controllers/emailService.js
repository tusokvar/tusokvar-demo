// backend/controllers/emailController.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.sendBookingConfirmation = async (req, res) => {
  const { to, subject, html } = req.body;

  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
    to,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, msg: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
