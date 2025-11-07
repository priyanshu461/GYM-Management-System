const express = require('express');
const router = express.Router();
const { login, signup, verify } = require('../controllers/AuthController');
const { authenticateToken } = require('../middlewares/auth');

// Login route
router.post('/login', login);

// Signup route
router.post('/signup', signup);

// Verify token route
router.get('/verify', authenticateToken, verify);

module.exports = router;
