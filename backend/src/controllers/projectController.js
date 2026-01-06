const Project = require('../models/Project');
const path = require('path');

// POST /api/projects  (admin) - accepts multipart/form-data with optional `images` files
const createProject = async (req, res, next) => {
  try {
    const { title, description, status, district, state, capacity } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Handle uploaded files (multer stores them on disk)
    let images = [];
    if (req.files && req.files.length) {
      images = req.files.map((f) => {
        // public URL path
        return `${req.protocol}://${req.get('host')}/uploads/${f.filename}`;
      });
    }

    const projectData = {
      title,
      description,
      status: status || 'pending',
      images,
      imageUrl: images[0] || undefined,
      location: district || state ? { district: district || '', state: state || '' } : undefined,
      capacity: capacity || undefined,
      createdBy: req.user?._id,
      updatedBy: req.user?._id,
    };

    const project = await Project.create(projectData);

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

// GET /api/projects  (public for frontend)
const getProjects = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) query.status = status;

    const projects = await Project.find(query).sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/projects/:id/status  (admin)
const updateProjectStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['pending', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status, updatedBy: req.user._id },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/projects/:id/image  (admin)
const updateProjectImage = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: 'imageUrl is required' });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { imageUrl, updatedBy: req.user._id },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
};

// GET /api/projects/:id  (public)
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

// PUT /api/projects/:id  (admin)
const updateProject = async (req, res, next) => {
  try {
    const updates = { ...req.body, updatedBy: req.user?._id };
    const project = await Project.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/projects/:id  (admin)
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/projects/stats  (admin)
const getProjectStats = async (req, res, next) => {
  try {
    const total = await Project.countDocuments();
    const completed = await Project.countDocuments({ status: 'completed' });
    const pending = await Project.countDocuments({ status: 'pending' });

    res.json({ total, completed, pending });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/projects  (admin)
const getAllProjectsAdmin = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProjectStatus,
  updateProjectImage,
  getProjectStats,
  getAllProjectsAdmin,
  // New endpoints for frontend compatibility
  getProjectById,
  updateProject,
  deleteProject,
};
