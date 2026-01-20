const Service = require('../models/Service');

// GET /api/admin/services
const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/services
const createService = async (req, res, next) => {
  try {
    const { title, description, icon, price, features } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Service title is required' });
    }

    const service = await Service.create({
      title: title.trim(),
      description: description?.trim() || '',
      icon: icon?.trim() || '',
      price: price?.trim() || '',
      features: Array.isArray(features) ? features.filter(f => f.trim()) : [],
    });

    res.status(201).json(service);
  } catch (err) {
    next(err);
  }
};

// PUT /api/admin/services/:id
const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, icon, price, features } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Service title is required' });
    }

    const service = await Service.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description?.trim() || '',
        icon: icon?.trim() || '',
        price: price?.trim() || '',
        features: Array.isArray(features) ? features.filter(f => f.trim()) : [],
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/services/:id
const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully', service });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService,
};
