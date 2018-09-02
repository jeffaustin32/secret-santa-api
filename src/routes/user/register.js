const db = require('../../config/db');
const bcrypt = require('bcrypt');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');

/**
 * Register a new user and return an JSON Web Token for them to use as authorization in subsequent requests
 * @param {String} firstName - The user's first name. Should be located in request body.
 * @param {String} lastName - The user's last name. Should be located in request body.
 * @param {String} email - The user's email address. Should be located in the request body.
 * @param {String} password - The user's desired password. Should be located in the request body.
 * @param {String} username - The user's username. Should be located in the request parameters.
 * @returns {String} The JSON Web Token string
 */
module.exports = (req, res) => {
    // Check that all required values are provided
    if (!req.body.firstName ||
        !req.body.lastName ||
        !req.body.email ||
        !req.body.password ||
        !req.params.username) {
        return res.status(400).send('Missing required parameter');
    }

    // Hash the password
    bcrypt.hash(req.body.password, config.SALT_ROUNDS).then(hash => {
        // Store user with hashed password in database
        db.one('INSERT INTO public.user (first_name, last_name, email, username, password) VALUES (${firstName}, ${lastName}, ${email}, ${username}, ${password}) RETURNING id', {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.params.username,
            password: hash
        })
            .then(data => {
                console.log(`New user registered: ${req.params.username}`);

                // Generate a JWT token for the user
                const token = jwt.sign({ id: data.id }, config.TOKEN_SECRET);
                return res.status(200).send(token);
            })
            .catch(error => {
                console.log('ERROR:', error);
                return res.status(500).send('Error registering user');
            });
    });
};