// backend/controllers/chatController.js
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getChatResponse = async (req, res) => {
  const { prompt } = req.body;

  const systemMessage = {
    role: 'system',
    content: `
      אתה צ'אט חכם באתר "טוסו כבר", אתר להזמנת טיסות.
      ענה על שאלות הגולשים רק בנושאי טיסות, יעדים, תאריכים ומחירים מתוך האתר בלבד.
      אל תספק מידע כללי או מחוץ לאתר בשום אופן.
      אם השאלה לא קשורה לנושאים הנ"ל, ענה בנימוס: "אני יכול לעזור לך רק בנושאים של טיסות, יעדים, תאריכים ומחירים באתר."
    `,
  };

  try {
    const completion = await openai.chat.completions.create({
      messages: [systemMessage, { role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: 150,
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error('OpenAI API Error:', err.message);
    res.status(500).json({ error: 'שגיאה בצ׳אט, אנא נסה שוב.' });
  }
};
