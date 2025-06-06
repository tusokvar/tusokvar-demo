// /backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// חיבור למסד הנתונים (MongoDB)
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// טעינת כל הנתיבים הראשיים (API)
const apiRoutes = require('./api/routes');
app.use('/api', apiRoutes);

// דף בית לבדיקת תקינות
app.get('/', (req, res) => {
  res.send('Tusokvar Backend API is running!');
});

// טיפול בנתיבים לא קיימים (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// הרצת השרת
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
