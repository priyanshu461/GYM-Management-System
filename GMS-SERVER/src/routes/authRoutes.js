const express = require('express');
const router = express.Router();
const { login, memberLogin, memberSignup, signup, verify } = require('../controllers/AuthController');
const { authenticateToken } = require('../middlewares/auth');

// Admin routes
router.post('/login', login);
router.post('/signup', signup);

// Member routes
router.post('/member/login', memberLogin);
router.post('/member/signup', memberSignup);

// Verify token route
router.post('/verify', authenticateToken, verify);

module.exports = router;
