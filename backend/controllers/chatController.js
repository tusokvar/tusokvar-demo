// backend/controllers/chatController.js
const axios = require('axios');

// פונקציה בסיסית לחילוץ פרטי חיפוש מטקסט (שדרג בהמשך לפי הצורך)
function extractFlightDetails(message) {
  // כאן תוכל להוסיף חוכמה לזיהוי מוצא, יעד ותאריך (כיום דוגמה ריקה)
  // דוגמה: return { origin: 'TLV', destination: 'JFK', departureDate: '2024-06-25' };
  return null;
}

exports.askGPT = async (req, res) => {
  try {
    const { message } = req.body;

    // בודק אם השאלה היא על חיפוש טיסה
    const isFlightSearch =
      /טיס(ה|ות)|חפש טיסה|מצא טיסה|האם יש טיסה|לאן אפשר לטוס|flight|flights|search flight|find flight/i.test(
        message
      );

    if (isFlightSearch) {
      // מנסה לחלץ פרטי חיפוש מהשאלה
      const details = extractFlightDetails(message);

      // אם אין מספיק פרטים - לבקש מהמשתמש למלא ידנית
      if (!details) {
        return res.json({
          answer:
            'אני יכול לעזור לך למצוא טיסה! אנא כתוב לי: "חפש טיסה מ-<מוצא> ל-<יעד> בתאריך <תאריך יציאה>". למשל: חפש טיסה מתל אביב לפריז בתאריך 21/08/2024.',
        });
      }

      // מבצע חיפוש טיסות דרך ה-API שלך (שים לב לכתובת ולמבנה הנתונים)
      try {
        const response = await axios.post(
          'https://tusokvar-demo.onrender.com/api/flights/search',
          details
        );
        const flights = response.data.flights || [];

        if (flights.length === 0) {
          return res.json({
            answer:
              'לא נמצאה טיסה מתאימה. אני ממליץ לך לחפש ידנית באתר או לשנות את הפרטים.',
          });
        }

        // אפשר לעצב איך להציג את התוצאה – כאן דוגמה פשוטה
        const flightText = flights
          .map(
            (flight, idx) =>
              `${idx + 1}. טיסה מ-${flight.origin} ל-${flight.destination} ב-${flight.departureDate}, מחיר: ${flight.price}`
          )
          .join('\n');

        return res.json({
          answer: `מצאתי עבורך את הטיסות הבאות:\n${flightText}`,
        });
      } catch (error) {
        return res.json({
          answer:
            'אירעה שגיאה בחיפוש הטיסה. נסה שנית או חפש ידנית באתר.',
        });
      }
    } else {
      // כל נושא אחר – מענה מצומצם
      return res.json({
        answer:
          'אני צ׳אט בוט של אתר טוסו כבר. אוכל לעזור רק בחיפוש טיסות, מלונות או מידע שמופיע באתר. לשאלות אחרות אנא פנה לשירות הלקוחות.',
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || 'OpenAI Error' });
  }
};
