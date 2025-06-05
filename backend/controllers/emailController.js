import nodemailer from 'nodemailer';

// דוגמה לשליחת אימייל
export const sendFlightEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    // הכנת טרנספורטר עם פרטי SMTP מתוך הסביבה
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true', // true אם רוצים SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // שליחת האימייל
    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to,
      subject,
      text
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};
