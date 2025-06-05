// backend/controllers/autoController.js
/**
 * דוגמה – נניח שיש לך לוגיקה אוטומטית שפועלת כאן
 */
const runAutoTask = (req, res) => {
  // לוגיקה אוטומטית לדוגמה
  console.log('Running auto task...');
  return res.json({ message: 'Auto task executed' });
};

module.exports = { runAutoTask };
