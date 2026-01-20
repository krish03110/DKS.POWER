const express = require('express');
const { getAllSchemes } = require('../controllers/schemeController');

const router = express.Router();

// Public endpoint to get all schemes
router.get('/', getAllSchemes);

module.exports = router;
