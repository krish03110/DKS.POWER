const Contact = require('../models/Contact');

// POST /api/contact
const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    const contact = await Contact.create({ name, email, phone, message });
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
};

module.exports = { createContact };
