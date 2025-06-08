// backend/controllers/flightController.js
const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

exports.searchFlights = async (req, res) => {
  const { origin, destination, departureDate, returnDate, adults } = req.body;
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      returnDate,
      adults,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.description || err.message });
  }
};

exports.bookFlight = async (req, res) => {
  res.json({ msg: 'Booking logic goes here.' });
};
