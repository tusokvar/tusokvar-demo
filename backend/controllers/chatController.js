// backend/controllers/chatController.js
const OpenAI = require('openai');
const axios = require('axios');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const searchFlights = async (origin, destination, date) => {
  try {
    const response = await axios.post(`${process.env.BACKEND_URI}/api/flights/search`, {
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
      אתה עוזר חכם וידידותי באתר "טוסו כבר", אתר להזמנת טיסות.
      אתה עונה רק על שאלות הקשורות לטיסות, יעדים, תאריכים, מחירים, מדיניות האתר ותנאי ביטול והחזרים.
      אם אינך מצליח לענות, תן ללקוח את ההודעה הבאה:
      "לצערי, אני לא מצליח לעזור כרגע. אנא צור קשר עם שירות הלקוחות שלנו ב-WhatsApp במספר 0501002003 ונשמח לעזור לך בתוך עד 3 שעות."
    `,
  };

  const messages = [systemMessage, { role: 'user', content: prompt }];

  try {
    if (prompt.includes('טיסה')) {
      const flightSearchRegex = /טיסה מ(.*?) ל(.*?) ב(\d{2}[.\/-]\d{2}[.\/-]\d{4})/;
      const match = prompt.match(flightSearchRegex);

      if (match) {
        const origin = match[1].trim();
        const destination = match[2].trim();
        const dateParts = match[3].split(/[-/.]/);
        const dateFormatted = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

        const flights = await searchFlights(origin, destination, dateFormatted);

        if (flights && flights.length > 0) {
          const flightInfo = flights.slice(0, 3).map((flight, idx) => (
            `\n${idx + 1}. טיסה מ-${origin} ל-${destination} בתאריך ${match[3]}: מחיר ${flight.price.total} ${flight.price.currency}`
          )).join('');

          return res.json({ reply: `הנה כמה אפשרויות לטיסות שמצאתי עבורך:${flightInfo}` });
        } else {
          return res.json({ reply: 'לא נמצאו טיסות מתאימות לתאריך וליעדים שביקשת. אנא נסה תאריכים אחרים או יעדים אחרים.' });
        }
      }
    }

    const completion = await openai.chat.completions.create({
      messages,
      model: 'gpt-3.5-turbo',
      max_tokens: 200,
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error('OpenAI API Error:', err.message);
    res.status(500).json({
      error: 'שגיאה בצ׳אט, אנא נסה שוב.',
      reply: 'לצערי, אני לא מצליח לעזור כרגע. אנא צור קשר עם שירות הלקוחות שלנו ב-WhatsApp במספר 0501002003 ונשמח לעזור לך בתוך עד 3 שעות.'
    });
  }
};
