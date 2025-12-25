const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    schemeType: { type: String, trim: true },
    powerRequirement: { type: String, trim: true },
    address: { type: String, trim: true },
    message: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
