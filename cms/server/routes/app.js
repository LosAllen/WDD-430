const express = require('express');
const router = express.Router();

// Default index route for API root
router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome to the CMS API!' });
});

module.exports = router;
