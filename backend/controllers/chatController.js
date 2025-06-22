// backend/controllers/chatController.js
const OpenAI = require('openai');
const axios = require('axios');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const searchFlights = async (origin, destination, date) => {
  try {
    const response = await axios.post(;${process.env.BACKEND_URI}/api/flights/search;, {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults: 1,
    });

    return response.data;
  } catch (error) {
    console.error('Flight search error:', error.message);
    return null;
  }
};

const airportsCodes = {
  'מדריד': 'MAD',
  'לונדון': 'LHR',
  'פריז': 'CDG',
  'תל אביב': 'TLV',
  'ניו יורק': 'JFK',
  'אמסטרדם': 'AMS',
  'רומא': 'FCO',
  'ברצלונה': 'BCN',
  'פרנקפורט': 'FRA',
  'אתונה': 'ATH',
  'איסטנבול': 'IST',
  'דובאי': 'DXB',
  'ברלין': 'BER',
  'וינה': 'VIE',
  'לוס אנג׳לס': 'LAX',
  'סן פרנסיסקו': 'SFO',
  'מיאמי': 'MIA',
  'שיקגו': 'ORD',
  'טורונטו': 'YYZ',
  'בנגקוק': 'BKK',
  'טוקיו': 'NRT',
  'הונג קונג': 'HKG',
  'סינגפור': 'SIN',
  'סידני': 'SYD',
  'מלבורן': 'MEL',
  'ריו דה ז׳נרו': 'GIG',
  'סאו פאולו': 'GRU',
  'מקסיקו סיטי': 'MEX',
  'בואנוס איירס': 'EZE',
  'דלהי': 'DEL',
  'מומבאי': 'BOM',
  'קהיר': 'CAI',
  'קופנהגן': 'CPH',
  'סטוקהולם': 'ARN',
  'אוסלו': 'OSL',
  'הלסינקי': 'HEL',
  'דבלין': 'DUB',
  'ליסבון': 'LIS',
  'ורשה': 'WAW',
  'בודפשט': 'BUD',
  'פראג': 'PRG',
  'מוסקבה': 'SVO',
  'מינכן': 'MUC',
  'בריסל': 'BRU',
  'ציריך': 'ZRH',
  'מילאנו': 'MXP',
  'ניס': 'NCE',
  'מנצ׳סטר': 'MAN',
  'ברמינגהם': 'BHX',
  'גלזגו': 'GLA',
  'אדינבורו': 'EDI',
  'קייב': 'KBP',
  'ריגה': 'RIX',
  'וילנה': 'VNO',
  'טאלין': 'TLL',
  // הוסף עוד עד 200 ערים
};

const parseDate = (dateText) => {
  if (dateText.includes('מחר')) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }
  return dateText;
};

exports.getChatResponse = async (req, res) => {
  const { prompt } = req.body;

  const systemMessage = {
    role: 'system',
    content: `
      אתה עוזר חכם באתר "טוסו כבר", אתה יכול לעזור למשתמשים למצוא טיסות זמינות.
      אם אתה לא מצליח למצוא מידע או לבצע חיפוש, תן למשתמש את ההודעה:
      "לצערי, אני לא מצליח לעזור כרגע. מומלץ לבצע חיפוש ידני או ליצור קשר עם שירות הלקוחות שלנו ב-WhatsApp במספר 0501002003 ונשמח לעזור לך בתוך עד 3 שעות."
    `,
  };

  const flightSearchRegex = /טיסה מ(.?) ל(.?) (מחר|\d{2}[.\/-]\d{2}[.\/-]\d{4})/;
  const match = prompt.match(flightSearchRegex);

  if (match) {
    const originCity = match[1].trim();
    const destinationCity = match[2].trim();
    const dateInput = match[3].trim();

    const originCode = airportsCodes[originCity];
    const destinationCode = airportsCodes[destinationCity];

    if (!originCode || !destinationCode) {
      return res.json({ reply: 'אני לא מזהה את אחד היעדים שציינת, אנא נסה שוב עם ערים מוכרות.' });
    }

    const dateFormatted = parseDate(dateInput);
    const flights = await searchFlights(originCode, destinationCode, dateFormatted);

    if (flights && flights.length > 0) {
      const flightInfo = flights.slice(0, 3).map((flight, idx) => (
        `\n${idx + 1}. טיסה מ${originCity} ל${destinationCity} בתאריך ${dateFormatted}: מחיר ${flight.price.total} ${flight.price.currency}`
      )).join('');

      return res.json({ reply: `הנה הטיסות שמצאתי עבורך:${flightInfo}` });
    } else {
      return res.json({ reply: 'לא נמצאו טיסות מתאימות לתאריך וליעדים שביקשת. מומלץ לבצע חיפוש ידני.' });
    }
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [systemMessage, { role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: 200,
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error('OpenAI API Error:', err.message);
    res.status(500).json({
      reply: 'לצערי, אני לא מצליח לעזור כרגע. מומלץ לבצע חיפוש ידני או ליצור קשר עם שירות הלקוחות שלנו ב-WhatsApp במספר 0501002003 ונשמח לעזור לך בתוך עד 3 שעות.'
    });
  }
};

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ reply: 'שגיאה פנימית, צור קשר עם שירות הלקוחות WhatsApp 0501002003.' });
  }
};
