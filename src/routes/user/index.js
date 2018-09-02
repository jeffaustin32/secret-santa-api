var express = require('express');
var router = express.Router();

// Login
router.post('/login', (req, res) => {
	require('./login')(req, res);
});

// Register
router.post('/:username', (req, res) => {
	require('./register')(req, res);
});

module.exports = router;