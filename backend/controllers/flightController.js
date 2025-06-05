// backend/controllers/flightController.js
/**
 * כאן תשים לוגיקה שתתקשר עם Amadeus SDK או REST API
 * כדי להחזיר טיסות בהתאם לפרמטרים ב־req.body
 */
const amadeus = require('amadeus'); // אם התקנת את המודול של Amadeus מראש

// צעיף פשוט לדוגמה
const searchFlights = async (req, res) => {
  const { origin, destination, date } = req.body;
  try {
    // דוגמה פשוטה לאיך להתחבר ל־Amadeus:
    const amadeusClient = new amadeus({
      clientId: process.env.AMADEUS_CLIENT_ID,
      clientSecret: process.env.AMADEUS_CLIENT_SECRET
    });
    const response = await amadeusClient.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults: '1'
    });
    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching flights:', error);
    return res.status(500).json({ message: 'Error fetching flights' });
  }
};

module.exports = { searchFlights };
