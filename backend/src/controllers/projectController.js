const Project = require('../models/Project');

// POST /api/projects  (admin)
const createProject = async (req, res, next) => {
  try {
    const { title, description, status, imageUrl } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const project = await Project.create({
      title,
      description,
      status: status || 'pending',
      imageUrl,
      createdBy: req.user?._id,
      updatedBy: req.user?._id,
    });

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
};
