const axios = require('axios');

exports.getFlights = async (req, res) => {
    const { origin, destination, date } = req.query;

    try {
        const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.AMADUES_CLIENT_ID,
            client_secret: process.env.AMADUES_CLIENT_SECRET
        }));

        const flightsResponse = await axios.get(`https://test.api.amadeus.com/v2/shopping/flight-offers`, {
            params: { originLocationCode: origin, destinationLocationCode: destination, departureDate: date, adults: 1 },
            headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` }
        });

        const flights = flightsResponse.data.data.map(flight => ({
            ...flight,
            price: {
                base: flight.price.total,
                markup: (flight.price.total * 0.10).toFixed(2),
                vat: (flight.price.total * 0.18).toFixed(2),
                total: (flight.price.total * 1.28).toFixed(2)
            }
        }));

        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
