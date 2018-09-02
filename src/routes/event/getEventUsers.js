const db = require('../../config/db');
const User = require('../../classes/user');

module.exports = (req, res) => {
    // Check that all required values are present
    if (!req.userId || !req.params.eventId) {
        return res.status(400).send('Missing required parameter');
    }

    // Get all events the user is a member of
    db.any('SELECT first_name, last_name, email, id FROM public.user WHERE id IN (SELECT user_id FROM public.user_event WHERE event_id = ${eventId})', {
        eventId: req.params.eventId
    })
        .then(users => {
            users = users.map(user => new User(user));
            return res.status(200).send(users);
        })
        .catch(error => {
            console.log('ERROR:', error);
            return res.status(500).send('Error getting an event');
        });
};