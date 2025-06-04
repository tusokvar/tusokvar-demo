// backend/controllers/bookingController.js

const { sendMail } = require('../emailService');

const createBooking = async (req, res) => {
  try {
    const { userId, flightId, totalPrice, passengers } = req.body;

    // שמירת ההזמנה במסד נתונים (בהמשך נשלב MongoDB / PostgreSQL)
    // כאן נכניס בעתיד: await Booking.create(...)

    // שליחת מייל ללקוח עם אישור
    await sendMail(
      req.user.email,
      'אישור הזמנה - טוסו כבר ✈',
      `<h2>שלום ${req.user.name},</h2>
      <p>ההזמנה שלך אושרה בהצלחה. סה"כ לתשלום: ${totalPrice} ₪</p>
      <p>כרטיסי הטיסה יישלחו אליך בהקדם</p>`
    );

    res.status(200).json({ message: 'הזמנה נשמרה ונשלח אישור במייל' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'שגיאה בעת יצירת ההזמנה' });
  }
};

module.exports = { createBooking };
