// /backend/controllers/chatController.js
const axios = require('axios');

exports.askGPT = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const answer = response.data.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message || "OpenAI Error" });
  }
};
