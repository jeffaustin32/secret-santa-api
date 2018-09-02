const db = require('../../config/db');

module.exports = (req, res) => {
    // Check that all required values are present
    if (!req.body.name || !req.body.description || !req.userId) {
        return res.status(400).send('Missing required parameter');
    }

    // Store new event in the database
    db.one('INSERT INTO public.event (name, description, admin) VALUES (${name}, ${description}, ${admin}) RETURNING id', {
        name: req.body.name,
        description: req.body.description,
        admin: req.userId
    })
        .then(event => {
            console.log(`New event created: ${event.id}`);
            return res.status(200).send(event);
        })
        .catch(error => {
            console.log('ERROR:', error);
            return res.status(500).send('Error creating event');
        });
};