const express = require('express');
const {
  createOffice,
  getOffices,
  getOfficeById,
  updateOffice,
  deleteOffice,
  getAllOfficesAdmin,
} = require('../controllers/officeController');

const router = express.Router();

// Public routes
router.get('/', getOffices);
router.get('/:id', getOfficeById);

// Admin routes
router.post('/', createOffice);
router.put('/:id', updateOffice);
router.delete('/:id', deleteOffice);

module.exports = router;
