// backend/emailService.js
const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

/**
 * שליחת מייל כללי. 
 * @param {object} options 
 *   { to, subject, text, html }
 */
const sendEmail = async (options) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
    to: options.to,
    subject: options.subject,
    text: options.text || '',
    html: options.html || null
  };
  const info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = { sendEmail };
