// backend/controllers/bookingController.js
/**
 * לוגיקה לדוגמה ליצירת booking
 * ניתן להוסיף שמירת Booking במסד אם נבנה מודל מתאים
 */
const createBooking = async (req, res) => {
  const { userId, flightOffer, amount } = req.body;

  try {
    // דוגמה פשוטה – נניח שיש לך לוגיקה לשמירת booking במסד
    // const booking = await Booking.create({ user: userId, flight: flightOffer, amount });
    // return res.status(201).json(booking);

    return res.json({ message: 'Booking created successfully (דוגמה)', data: { userId, flightOffer, amount } });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ message: 'Error creating booking' });
  }
};

module.exports = { createBooking };
