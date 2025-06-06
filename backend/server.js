// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./api/routes');

// טעינת משתני סביבה
dotenv.config();

// חיבור למסד נתונים MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// טעינת ה־routes הראשיים
app.use('/api', routes);

// פורט להאזנה, מ־env או ברירת מחדל ל־5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
