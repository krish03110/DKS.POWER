const express = require('express');
const { createApplication } = require('../controllers/applicationController');

const router = express.Router();

// Public endpoint for frontend
router.post('/', createApplication);

module.exports = router;
