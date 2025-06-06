// /backend/controllers/flightController.js
const axios = require('axios');

// פונקציה לקבלת טוקן מאמדאוס
async function getAmadeusToken() {
  const res = await axios.post(
    'https://test.api.amadeus.com/v1/security/oauth2/token',
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AMADEUS_CLIENT_ID,
      client_secret: process.env.AMADEUS_CLIENT_SECRET,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return res.data.access_token;
}

// פונקציית אוטוקומפליט
exports.autocompleteAirports = async (req, res) => {
  try {
    const { keyword } = req.query;
    const token = await getAmadeusToken();
    const response = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&keyword=${keyword}&page[limit]=8`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
