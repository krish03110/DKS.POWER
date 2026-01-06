const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    imageUrl: { type: String }, // single primary image URL
    images: [{ type: String }], // additional image URLs
    location: {
      district: { type: String, trim: true },
      state: { type: String, trim: true },
    },
    capacity: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
