const express = require('express');
const { loginUser } = require('../controllers/authController');

const router = express.Router();

/**
 * POST /api/auth/login
 * Login user with email and password
 * Returns JWT token and user info
 */
router.post('/login', loginUser);

module.exports = router;
