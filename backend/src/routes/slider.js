const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  createSliderImage,
  getSliderImages,
  getAllSliderImagesAdmin,
  updateSliderImage,
  deleteSliderImage,
} = require('../controllers/sliderController');

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

// Public routes
router.get('/', getSliderImages);

// Admin routes
router.get('/admin/all', getAllSliderImagesAdmin);
router.post('/', upload.array('images', 1), createSliderImage);
router.put('/:id', upload.array('images', 1), updateSliderImage);
router.delete('/:id', deleteSliderImage);

module.exports = router;
