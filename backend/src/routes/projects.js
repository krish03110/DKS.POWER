const express = require('express');
const {
  createProject,
  getProjects,
  updateProjectStatus,
  updateProjectImage,
} = require('../controllers/projectController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Public for frontend user (Project.jsx list)
router.get('/', getProjects);

// Admin creates new project (AddProject.jsx)
router.post('/', protect, adminOnly, createProject);

// Admin updates status (pending/completed)
router.patch('/:id/status', protect, adminOnly, updateProjectStatus);

// Admin sets/changes imageUrl for completed project
router.patch('/:id/image', protect, adminOnly, updateProjectImage);

module.exports = router;
