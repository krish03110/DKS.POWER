const Scheme = require('../models/Scheme');

// GET /api/admin/schemes
const getAllSchemes = async (req, res, next) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 });
    res.json(schemes);
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/schemes
const createScheme = async (req, res, next) => {
  try {
    const { title, description, link, subsidy, target } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Scheme title is required' });
    }

    const scheme = await Scheme.create({
      title: title.trim(),
      description: description?.trim() || '',
      subsidy: subsidy?.trim() || '',
      target: target?.trim() || '',
      link: link?.trim() || '',
    });

    res.status(201).json(scheme);
  } catch (err) {
    next(err);
  }
};

// PUT /api/admin/schemes/:id
const updateScheme = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, link, subsidy, target } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Scheme title is required' });
    }

    const scheme = await Scheme.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description?.trim() || '',
        subsidy: subsidy?.trim() || '',
        target: target?.trim() || '',
        link: link?.trim() || '',
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    res.json(scheme);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/schemes/:id
const deleteScheme = async (req, res, next) => {
  try {
    const { id } = req.params;

    const scheme = await Scheme.findByIdAndDelete(id);

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    res.json({ message: 'Scheme deleted successfully', scheme });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllSchemes,
  createScheme,
  updateScheme,
  deleteScheme,
};
