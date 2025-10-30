const express = require('express');
const router = express.Router();
const { login, signup, verify } = require('../http/controllers/AuthController');

// Login route
router.post('/login', login);

// Signup route
router.post('/signup', signup);

// Verify token route
router.get('/verify', verify);

module.exports = router;
