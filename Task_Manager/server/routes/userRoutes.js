const express = require('express');
const router = express.Router();

// Protected route - Example
router.get('/', (req, res) => {
  res.send('Get all users');
});

module.exports = router;
