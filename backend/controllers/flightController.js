// backend/controllers/flightController.js
const axios = require('axios');

// טוקן לאמדאוס (לפי קיים)
async function getAmadeusToken() {
  const res = await axios.post(
    'https://test.api.amadeus.com/v1/security/oauth2/token',
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AMADEUS_CLIENT_ID,
      client_secret: process.env.AMADEUS_CLIENT_SECRET,
    }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );
  return res.data.access_token;
}

// השלמה של שדות שדה תעופה
exports.autocompleteAirports = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword || keyword.length < 2) return res.json({ data: [] });

    const token = await getAmadeusToken();
    const response = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&keyword=${encodeURIComponent(
        keyword
      )}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const results = (response.data.data || []).map((item) => ({
      name: item.name,
      iataCode: item.iataCode,
      country: item.address && item.address.countryName ? item.address.countryName : '',
      city: item.address && item.address.cityName ? item.address.cityName : '',
    }));
    res.json({ data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// חיפוש טיסות אמיתי לפי פרמטרים
exports.searchFlights = async (req, res) => {
  try {
    const { origin, destination, departureDate, returnDate } = req.body;
    if (!origin || !destination || !departureDate)
      return res.status(400).json({ error: 'Missing flight search parameters.' });

    const token = await getAmadeusToken();
    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}${
      returnDate ? `&returnDate=${returnDate}` : ''
    }&adults=1`;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const flights = (response.data.data || []).map((f) => ({
      origin,
      destination,
      departureDate,
      price: f.price && f.price.total ? f.price.total : 'לא ידוע',
    }));

    if (flights.length === 0) {
      return res.json({
        message: 'לא נמצאו טיסות במועד המבוקש. נסה תאריך אחר.',
        flights: [],
      });
    }
    res.json({ flights });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
