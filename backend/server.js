import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// ייבוא הנתיבים
import emailRoutes from './routes/emailRoutes.js';
import flightRoutes from './routes/flightRoutes.js';
import userRoutes from './routes/userRoutes.js';

// נטען את קובץ ה־.env
dotenv.config();

const app = express();

// מיידלווייר גלובליים
app.use(cors());
app.use(express.json());

// חיבור ל־MongoDB
connectDB();

// --- הגדרת הנתיבים ---
app.use('/api/emails', emailRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/users', userRoutes);

// אפשר להוסיף כאן נתיבי API נוספים אם צריך

// בדיקת פעילות בסיסית
app.get('/', (req, res) => {
  res.send('🛫 Tusokvar Backend is running 🛬');
});

// בחירת פורט מתוך הסביבה או 5000 כ־default
const PORT = process.env.PORT || 5000;

// הרצת השרת
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
