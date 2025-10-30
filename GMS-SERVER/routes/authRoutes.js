const express = require('express');
const router = express.Router();
const { login, signup } = require('../http/controllers/AuthController');

// Login route
router.post('/login', login);

// Signup route
router.post('/signup', signup);

// Verify token route - commented out since verify is not exported
// router.get('/verify', verify);

module.exports = router;
