const Application = require('../models/Application');

// POST /api/applications
const createApplication = async (req, res, next) => {
  try {
    const { name, email, phone, schemeType, powerRequirement, address, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    const application = await Application.create({
      name,
      email,
      phone,
      schemeType,
      powerRequirement,
      address,
      message
    });
    res.status(201).json(application);
  } catch (err) {
    next(err);
  }
};

module.exports = { createApplication };
