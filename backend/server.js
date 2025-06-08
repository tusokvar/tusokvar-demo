const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./api/routes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URI }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic API route for testing
app.get('/api', (req, res) => {
  res.send('API is running');
});

// Main API routes
app.use('/api', routes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
