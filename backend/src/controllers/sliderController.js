const SliderImage = require('../models/SliderImage');

// POST /api/slider-images (admin) - Create new slider image
const createSliderImage = async (req, res, next) => {
  try {
    const { title, subtitle, order } = req.body;

    if (!title || !req.files || !req.files.length) {
      return res.status(400).json({ message: 'Title and image are required' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.files[0].filename}`;

    const sliderImage = await SliderImage.create({
      title,
      subtitle: subtitle || '',
      imageUrl,
      order: order || 0,
      createdBy: req.user?._id,
    });

    res.status(201).json(sliderImage);
  } catch (err) {
    next(err);
  }
};

// GET /api/slider-images (public)
const getSliderImages = async (req, res, next) => {
  try {
    const images = await SliderImage.find({ active: true })
      .sort({ order: 1, createdAt: -1 });
    res.json(images);
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/slider-images (admin - all including inactive)
const getAllSliderImagesAdmin = async (req, res, next) => {
  try {
    const images = await SliderImage.find()
      .sort({ order: 1, createdAt: -1 });
    res.json(images);
  } catch (err) {
    next(err);
  }
};

// PUT /api/slider-images/:id (admin)
const updateSliderImage = async (req, res, next) => {
  try {
    const { title, subtitle, order, active } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (order !== undefined) updateData.order = order;
    if (active !== undefined) updateData.active = active;

    // If new image uploaded
    if (req.files && req.files.length) {
      updateData.imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.files[0].filename}`;
    }

    const image = await SliderImage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!image) return res.status(404).json({ message: 'Slider image not found' });
    res.json(image);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/slider-images/:id (admin)
const deleteSliderImage = async (req, res, next) => {
  try {
    const image = await SliderImage.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ message: 'Slider image not found' });
    res.json({ message: 'Slider image deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSliderImage,
  getSliderImages,
  getAllSliderImagesAdmin,
  updateSliderImage,
  deleteSliderImage,
};
