// backend/controllers/emailController.js
const nodemailer = require('nodemailer');
const { MAIL_FROM_NAME, MAIL_FROM_ADDRESS, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

// פונקציה לשליחת אימייל אודות טיסה
const sendFlightEmail = async (req, res) => {
  const { to, subject, message } = req.body;

  // הגדרת ה־transporter
  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // true אם פורט 465
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  const mailOptions = {
    from: "${MAIL_FROM_NAME}" <${MAIL_FROM_ADDRESS}>,
    to,
    subject,
    text: message
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return res.json({ message: 'Email sent successfully', info });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email' });
  }
};

module.exports = { sendFlightEmail };
