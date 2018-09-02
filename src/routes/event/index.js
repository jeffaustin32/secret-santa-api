var express = require('express');
var router = express.Router();

// Get all events
router.get('/', (req, res) => {
    require('./getEvents')(req, res);
});

// Get an event
router.get('/:eventId', (req, res) => {
    require('./getEvent')(req, res);
});

// Get users for an event
router.get('/:eventId/users', (req, res) => {
    require('./getEventUsers')(req, res);
});

// Create an event
router.post('/', (req, res) => {
    require('./createEvent')(req, res);
});

// Update an event
router.patch('/:eventId', (req, res) => {
    require('./updateEvent')(req, res);
});

// Delete an event
router.delete('/:eventId', (req, res) => {
    require('./deleteEvent')(req, res);
});

module.exports = router;