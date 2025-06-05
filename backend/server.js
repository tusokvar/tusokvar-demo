// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// טען משתני סביבה
dotenv.config();

const app = express();

// חיבור ל־MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes API
const apiRoutes = require('./api/routes');
app.use('/api', apiRoutes);

// קישור ל־root
app.get('/', (req, res) => {
  res.send('Tusokvar Backend is running');
});

// Error handling Middleware (לדוגמה בסיסי)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// מאזין לפורט
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
