// backend/flightController.js
const axios = require('axios');

const getAccessToken = async () => {
  const { AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET } = process.env;
  const response = await axios.post(
    'https://test.api.amadeus.com/v1/security/oauth2/token',
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: AMADEUS_CLIENT_ID,
      client_secret: AMADEUS_CLIENT_SECRET,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return response.data.access_token;
};

exports.searchFlights = async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { origin, destination, date } = req.query;

    const response = await axios.get(
      'https://test.api.amadeus.com/v2/shopping/flight-offers',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: date,
          adults: 1,
          currencyCode: 'USD',
          max: 10
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching flights:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch flight offers' });
  }
};
