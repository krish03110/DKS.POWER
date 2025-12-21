import express from 'express';

const router = express.Router();

// POST /api/applications - Submit solar application
router.post('/applications', async (req, res) => {
  try {
    const { fullName, email, phone, schemeType, powerRequirement, address, message } = req.body;

    // Validation
    if (!fullName || !email || !phone || !schemeType || !powerRequirement || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Save to MongoDB when connected
    console.log('New Application:', { fullName, email, phone, schemeType, powerRequirement, address, message });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully. Our team will contact you soon.',
      data: {
        fullName,
        email,
        phone,
        schemeType,
        powerRequirement,
        address,
        submittedAt: new Date(),
      }
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// GET /api/applications - Fetch all applications (for admin panel - add auth later)
router.get('/applications', async (req, res) => {
  try {
    // TODO: Fetch from MongoDB when connected
    res.json({
      success: true,
      data: []
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

export default router;
