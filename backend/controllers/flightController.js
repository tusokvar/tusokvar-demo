import fetch from 'node-fetch';

/**
 * דוגמא לפונקציה שמביאה נתוני טיסות מ־Amadeus API
 * חשוב: ודא ששמתם במשתני הסביבה את AMADEUS_CLIENT_ID ו־AMADEUS_CLIENT_SECRET 
 */
export const getFlights = async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    // נניח שה־env מכיל: AMADEUS_CLIENT_ID ו־AMADEUS_CLIENT_SECRET
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    // בקשת token
    const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // בקשת טיסות
    const flightsResponse = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&max=5`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const flightsData = await flightsResponse.json();

    res.status(200).json({ flights: flightsData.data });
  } catch (error) {
    console.error('❌ Error fetching flights:', error);
    res.status(500).json({ message: 'Failed to fetch flights', error: error.message });
  }
};
