// backend/controllers/flightController.js
const Amadeus = require('amadeus');
const { calculateFinalPrice } = require('../utils/utils');

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

    const processedFlights = response.data.map(offer => ({
      ...offer,
      price: {
        ...offer.price,
        total: calculateFinalPrice(parseFloat(offer.price.total)),
      }
    }));

    res.json(processedFlights);

  } catch (error) {
    console.error('Amadeus API error:', error); //error.response?.data || error.message);
    const errorMessage = error.response?.data?.errors?.[0]?.detail || error.message;
    res.status(500).json({ error: errorMessage });
  }
};
