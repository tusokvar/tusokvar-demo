const OpenAI = require('openai');
const axios = require('axios');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const airportCodes = {
  "תל אביב": "TLV", "פריז": "CDG", "לונדון": "LHR",
  "ניו יורק": "JFK", "אמסטרדם": "AMS", "מדריד": "MAD",
};

const searchFlights = async (origin, destination, date) => {
  try {
    const response = await axios.post(${process.env.BACKEND_URI}/api/flights/search, {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults: 1
    });

    return response.data;
  } catch (error) {
    console.error('Flight search error:', error);
    return null;
  }
};

exports.getChatResponse = async (req, res) => {
  const { prompt } = req.body;
  const systemMessage = {
    role: 'system',
    content: `
      אתה עוזר חכם באתר "טוסו כבר", המספק מידע על טיסות בלבד.
      אם אתה לא יכול לעזור, הפנה לשירות לקוחות: WhatsApp 0501002003.
    `,
  };

  const messages = [systemMessage, { role: 'user', content: prompt }];

  try {
    const flightRegex = /טיסה מ(.?) ל(.?) ב(\d{2}[./-]\d{2}[./-]\d{4})/;
    const match = prompt.match(flightRegex);

    if (match) {
      const originName = match[1].trim();
      const destName = match[2].trim();
      const dateParts = match[3].split(/[-./]/);
      const formattedDate = ${dateParts[2]}-${dateParts[1]}-${dateParts[0]};

      const origin = airportCodes[originName];
      const destination = airportCodes[destName];

      if (!origin || !destination) {
        return res.json({ reply: 'אחד היעדים לא נתמך, אנא נסה יעד אחר.' });
      }

      const flights = await searchFlights(origin, destination, formattedDate);

      if (flights && flights.length > 0) {
        const flightInfo = flights.slice(0,3).map((flight, idx) => (
          \n${idx + 1}. טיסה ב-${match[3]}: ${flight.price.total} ${flight.price.currency}
        )).join('');
        return res.json({ reply: אפשרויות זמינות:${flightInfo} });
      } else {
        return res.json({ reply: 'לא נמצאו טיסות מתאימות.' });
      }
    }

    const completion = await openai.chat.completions.create({
      messages,
      model: 'gpt-3.5-turbo',
      max_tokens: 200,
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ reply: 'שגיאה פנימית, צור קשר עם שירות הלקוחות WhatsApp 0501002003.' });
  }
};
