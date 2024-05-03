const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();

// Signup route
router.post('/signup', [
  check('username', 'Username is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], authController.signup);

// Login route
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], authController.login);

module.exports = router;
