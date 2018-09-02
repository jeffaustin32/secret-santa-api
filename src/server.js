const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Parse incoming post request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

// Registration and authentication routes
app.use('/user', require('./routes/user'));
// Authorization middleware
app.use('/', require('./middleware/authorization'));
// Event routes
app.use('/event', require('./routes/event'));

module.exports = app;