const db = require('../../config/db');

module.exports = (req, res) => {
    // Check that all required values are present
    if (!req.body.name || !req.body.description || !req.params.eventId || !req.userId) {
        return res.status(400).send('Missing required parameter');
    }

    // Store new event in the database
    db.none('UPDATE public.event SET name = ${name}, description = ${description} WHERE id = ${id} AND admin = ${admin}', {
        name: req.body.name,
        description: req.body.description,
        id: req.params.eventId,
        admin: req.userId
    })
        .then(response => {
            console.log(response);
            return res.status(200).send();
        })
        .catch(error => {
            console.log('ERROR:', error);
            return res.status(500).send('Error updating event');
        });
};