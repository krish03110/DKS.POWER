const express = require('express');
const { createContact } = require('../controllers/contactController');

const router = express.Router();

// Public endpoint for frontend
router.post('/', createContact);

module.exports = router;
