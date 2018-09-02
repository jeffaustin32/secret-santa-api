const db = require('../../config/db');

module.exports = (req, res) => {
    // Check that all required values are present
    if (!req.params.eventId || !req.userId) {
        return res.status(400).send('Missing required parameter');
    }

    // Store new event in the database
    db.none('DELETE FROM public.event WHERE id = ${id} AND admin = ${admin}', {
        id: req.params.eventId,
        admin: req.userId
    })
        .then(() => {
            return res.status(200).send();
        })
        .catch(error => {
            console.log('ERROR:', error);
            return res.status(500).send('Error updating event');
        });
};