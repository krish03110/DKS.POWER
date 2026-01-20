const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  getProjectStats,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
  updateProjectStatus,
} = require('../controllers/projectController');
const {
  getAllSliderImagesAdmin,
  createSliderImage,
  updateSliderImage,
  deleteSliderImage,
} = require('../controllers/sliderController');
const {
  getAllSchemes,
  createScheme,
  updateScheme,
  deleteScheme,
} = require('../controllers/schemeController');
const {
  getAllServices,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

// Ensure upload dir exists
const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = express.Router();

// Project admin endpoints
router.get('/projects/stats', getProjectStats);
router.get('/projects', getAllProjectsAdmin);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);
router.patch('/projects/:id/status', updateProjectStatus);

// Slider image admin endpoints
router.get('/slider-images', getAllSliderImagesAdmin);
router.post('/slider-images', upload.array('images', 1), createSliderImage);
router.put('/slider-images/:id', upload.array('images', 1), updateSliderImage);
router.delete('/slider-images/:id', deleteSliderImage);

// Scheme admin endpoints
router.get('/schemes', getAllSchemes);
router.post('/schemes', createScheme);
router.put('/schemes/:id', updateScheme);
router.delete('/schemes/:id', deleteScheme);

// Service admin endpoints
router.get('/services', getAllServices);
router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

module.exports = router;
