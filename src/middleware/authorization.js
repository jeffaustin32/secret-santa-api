const config = require('../config/config');
const jwt = require('jsonwebtoken');

// Check for presence and validity of access token
module.exports = (req, res, next) => {
    console.log(`Token: ${req.headers['authorization']}`);
    // Verify that token exists and is valid
    if (!req.headers['authorization']) {
        return res.status(401).send('No authorization header provided.');
    }

    // Remove Bearer from the authorization header
    const token = req.headers['authorization'].replace('Bearer ', '');

    console.log(token);

    jwt.verify(token, config.TOKEN_SECRET, function (err, decoded) {
        if (err) {
            console.log(err);
            return res.status(500).send('Failed to authenticate authorization token.');
        }

        // Token is valid, add user id to req
        req.userId = decoded.id;

        next();
    });
}