const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// טוען משתני סביבה
dotenv.config();

// חיבור למסד הנתונים
connectDB();

const app = express();

// אמצעי ביניים (Middleware)
app.use(cors());
app.use(express.json());

// נתיבי API
const flightRoutes = require('./routes/flightRoutes');
const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');

app.use('/api/flights', flightRoutes);
app.use('/api/users', userRoutes);
app.use('/api/email', emailRoutes);

// ברירת מחדל - דף בסיסי
app.get('/', (req, res) => {
  res.send('ברוך הבא לשרת של טוסו כבר ✈');
});

// Port מהסביבה או 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ השרת רץ על פורט ${PORT}`);
});
