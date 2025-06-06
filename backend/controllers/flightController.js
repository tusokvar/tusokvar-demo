// /backend/controllers/flightController.js
const axios = require('axios');

// פונקציה לקבלת טוקן מאמדאוס (sandbox)
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
    if (!keyword || keyword.length < 2) {
      return res.json({ data: [] });
    }
    const token = await getAmadeusToken();
    const response = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&keyword=${encodeURIComponent(keyword)}&page[limit]=8`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // מחזירים רק את השדות הרלוונטיים (שם, קוד IATA)
    const results = (response.data.data || []).map(item => ({
      name: item.name,
      iataCode: item.iataCode,
      country: item.address && item.address.countryName ? item.address.countryName : "",
      city: item.address && item.address.cityName ? item.address.cityName : "",
    }));
    res.json({ data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
