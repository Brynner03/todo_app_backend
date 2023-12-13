const express = require('express');
const app = express();
const cors = require('cors');
const AppRouter = require('./routes/AppRoutes');
const { seed } = require('./seed');
require('dotenv').config();

seed();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Using express.json() to parse JSON bodies

app.get('/', (req, res) => res.json({ message: 'Server Works' }));
app.use('/api', AppRouter);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;
