const db = require('../../config/db');
const bcrypt = require('bcrypt');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const ApiRes = require('../../classes/api-res');
const User = require('../../classes/user');

/**
 * Authenticate a user and return an JSON Web Token for them to use as authorization in subsequent requests
 * @param {String} username - The user's username. Should be located in the request body.
 * @param {String} password - The user's desired password. Should be located in the request body.
 * @returns {String} The JSON Web Token string
 */
module.exports = (req, res) => {
    // Check that all required values are provided
    if (!req.body.password ||
        !req.body.username) {
        return res.status(400).send(new ApiRes(400, 'Missing required parameter', null));
    }

    // Select the user corresponding to the provided username
    db.oneOrNone('SELECT id, first_name, last_name, email, password FROM public.user WHERE username = ${username}', {
        username: req.body.username
    })
        .then(user => {
            // Username does not exist
            if (!user) {
                return res.status(401).send(new ApiRes(401, 'Username or password is incorrect', null));
            }

            console.log(`Selected user id: ${user.id}, password: ${user.password}`);

            // Compare provided password with hashed password in database
            bcrypt.compare(req.body.password, user.password, function (err, success) {
                if (!success || err) {
                    return res.status(401).send(new ApiRes(401, 'Username or password is incorrect', null));
                }

                // Generate a JWT token for the user
                const token = jwt.sign({ id: user.id }, config.TOKEN_SECRET);

                const data = {
                    token: token,
                    user: new User(user)
                };

                return res.status(200).send(new ApiRes(200, 'Login successful', data));
            });

        })
        .catch(error => {
            console.log('ERROR:', error);
            return res.status(500).send(new ApiRes(500, 'Error during login', null));
        });
};