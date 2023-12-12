const express = require('express');
const app = express();
const cors = require('cors')
const AppRouter = require('./routes/AppRoutes')
const bodyParser = require('body-parser');
const { seed } = require('./seed')
require('dotenv').config();
seed()

const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/api', AppRouter)

// Start the server

module.exports = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});