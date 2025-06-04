// backend/emailService.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendMail(to, subject, html) {
  const mailOptions = {
    from: "${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>,
    to,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent to:', to);
  } catch (err) {
    console.error('Error sending email:', err);
  }
}

module.exports = { sendMail };
