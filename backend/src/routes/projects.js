const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  createProject,
  getProjects,
  updateProjectStatus,
  updateProjectImage,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
// Auth middleware removed; routes are public or handle auth elsewhere

const router = express.Router();

// Ensure upload dir exists
const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// Public for frontend user (Project.jsx list)
router.get('/', getProjects);

// Public get by id
router.get('/:id', getProjectById);

// Admin creates new project (AddProject.jsx) - accept up to 6 images under field name 'images'
router.post('/', upload.array('images', 6), createProject);

// Admin updates status (pending/completed)
router.patch('/:id/status', updateProjectStatus);

// Admin sets/changes imageUrl for completed project
router.patch('/:id/image', updateProjectImage);

// Admin update project
router.put('/:id', updateProject);

// Admin delete project
router.delete('/:id', deleteProject);

module.exports = router;
