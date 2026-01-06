const express = require('express');
const {
  getProjectStats,
  getAllProjectsAdmin,
} = require('../controllers/projectController');

const router = express.Router();

// Auth middleware removed; admin checks should be handled upstream if needed
router.get('/projects/stats', getProjectStats);
router.get('/projects', getAllProjectsAdmin);

module.exports = router;
