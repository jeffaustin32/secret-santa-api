const db = require('../../config/db');

module.exports = (req, res) => {
    // Check that all required values are present
    if (!req.userId) {
        return res.status(400).send('Missing required parameter');
    }

    // Get all events the user is a member of
    db.any('SELECT id, name, description, admin FROM public.event WHERE id IN (SELECT event_id FROM public.user_event WHERE user_id = ${id})', {
        id: req.userId
    })
        .then(events => {
            console.log(`Selected events`, events);
            return res.status(200).send(events);
        })
        .catch(error => {
            console.log('ERROR:', error);
            return res.status(500).send('Error getting an event');
        });
};