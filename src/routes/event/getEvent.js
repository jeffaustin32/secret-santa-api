const db = require('../../config/db');

module.exports = (req, res) => {
    // Check that all required values are present
    if (!req.params.eventId || !req.userId) {
        return res.status(400).send('Missing required parameter');
    }

    // Get the event
    db.oneOrNone('SELECT public.event.id, public.event.name, public.event.description, public.event.admin FROM public.event RIGHT JOIN public.user_event ON public.user_event.event_id = public.event.id AND public.user_event.user_id = ${userId}WHERE public.event.id = ${eventId}', {
        userId: req.userId,
        eventId: req.params.eventId
    })
        .then(event => {
            return res.status(200).send(event);
        })
        .catch(error => {
            console.log('ERROR:', error);
            return res.status(500).send('Error getting an event');
        });
};