const Office = require('../models/Office');

// POST /api/offices (admin) - accepts multipart/form-data with optional `images` files
const createOffice = async (req, res, next) => {
  try {
    const { name, address, city, state, phone, email, description, latitude, longitude } = req.body;

    if (!name || !address || !city || !state || !phone || !email) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    let images = [];
    if (req.files && req.files.length) {
      images = req.files.map((f) => {
        return `${req.protocol}://${req.get('host')}/uploads/${f.filename}`;
      });
    }

    const officeData = {
      name,
      address,
      city,
      state,
      phone,
      email,
      description: description || undefined,
      images,
      imageUrl: images[0] || undefined,
      latitude: latitude || undefined,
      longitude: longitude || undefined,
      createdBy: req.user?._id,
      updatedBy: req.user?._id,
    };

    const office = await Office.create(officeData);

    res.status(201).json(office);
  } catch (err) {
    next(err);
  }
};

// GET /api/offices (public)
const getOffices = async (req, res, next) => {
  try {
    const offices = await Office.find().sort({ createdAt: -1 });
    res.json(offices);
  } catch (err) {
    next(err);
  }
};

// GET /api/offices/:id (public)
const getOfficeById = async (req, res, next) => {
  try {
    const office = await Office.findById(req.params.id);
    if (!office) return res.status(404).json({ message: 'Office not found' });
    res.json(office);
  } catch (err) {
    next(err);
  }
};

// PUT /api/offices/:id (admin)
const updateOffice = async (req, res, next) => {
  try {
    const updates = { ...req.body, updatedBy: req.user?._id };

    let images = [];
    if (req.files && req.files.length) {
      images = req.files.map((f) => {
        return `${req.protocol}://${req.get('host')}/uploads/${f.filename}`;
      });
      updates.images = images;
      updates.imageUrl = images[0];
    }

    const office = await Office.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!office) return res.status(404).json({ message: 'Office not found' });
    res.json(office);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/offices/:id (admin)
const deleteOffice = async (req, res, next) => {
  try {
    const office = await Office.findByIdAndDelete(req.params.id);
    if (!office) return res.status(404).json({ message: 'Office not found' });
    res.json({ message: 'Office deleted' });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/offices (admin)
const getAllOfficesAdmin = async (req, res, next) => {
  try {
    const offices = await Office.find().sort({ createdAt: -1 });
    res.json(offices);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOffice,
  getOffices,
  getOfficeById,
  updateOffice,
  deleteOffice,
  getAllOfficesAdmin,
};
