const axios = require('axios');
require('dotenv').config();

const searchFlights = async (req, res) => {
  const { origin, destination, departureDate, returnDate, adults } = req.query;

  try {
    const tokenResponse = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const token = tokenResponse.data.access_token;

    const flightResponse = await axios.get(
      'https://test.api.amadeus.com/v2/shopping/flight-offers',
      {
        headers: {
          Authorization: Bearer ${token}
        },
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate,
          returnDate,
          adults,
          currencyCode: 'USD',
          max: 10
        }
      }
    );

    res.status(200).json(flightResponse.data);
  } catch (error) {
    console.error('Error fetching flights:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
};

module.exports = { searchFlights };
