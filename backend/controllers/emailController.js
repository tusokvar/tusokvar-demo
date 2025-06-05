const nodemailer = require('nodemailer');

const sendFlightEmail = async (req, res) => {
  const { to, subject, flight } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: `
        <h3>אישור הזמנת טיסה</h3>
        <p>טיסה מ-${flight.origin} אל ${flight.destination}</p>
        <p>תאריך: ${flight.date}</p>
        <p>מספר טיסה: ${flight.flightNumber}</p>
        <p>מחיר: ${flight.price}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'המייל נשלח בהצלחה' });

  } catch (error) {
    console.error('שגיאה בשליחת מייל:', error);
    res.status(500).json({ error: 'שגיאה בשליחת מייל' });
  }
};

module.exports = { sendFlightEmail };
