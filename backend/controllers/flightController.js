// backend/controllers/flightController.js
const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

exports.searchFlights = async (req, res) => {
  const { origin, destination, departureDate, returnDate } = req.body;

  if (!origin || !destination || !departureDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      returnDate: returnDate,
      adults: 1,
    });

    res.json(response.data);
  } catch (error) {
    console.error('Amadeus API error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};
