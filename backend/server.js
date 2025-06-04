const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./api/routes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Tusokvar backend is running!');
});

app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
