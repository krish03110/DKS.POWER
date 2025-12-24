const express = require('express');
const {
  getProjectStats,
  getAllProjectsAdmin,
} = require('../controllers/projectController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, adminOnly);

router.get('/projects/stats', getProjectStats);
router.get('/projects', getAllProjectsAdmin);

module.exports = router;
