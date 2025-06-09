const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const routes = require('./api/routes');

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URI,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// נתיבי ה-API
app.use('/api', routes);

// הגדרת נתיבים סטטיים לקבצי React שנבנו
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ניתוב כללי ל-React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
