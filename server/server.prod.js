const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// Load environment variables from '.env'
require('dotenv').load();

const PORT = process.env.PORT || 3000;

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ limit: '500kb', extended: false }));
app.use(bodyParser.json({limit: '500kb', strict: false}));

// Static files
app.use('/public', express.static(path.resolve(__dirname, '../public')))

// API endpoints
app.use('/api', require('./api/time'));

// Catch all to send everything to the client-side to be handled.
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public/index.prod.html'));
});

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}!`);
});
