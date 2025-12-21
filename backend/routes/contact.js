import express from 'express';

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/contact', async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // Validation
    if (!fullName || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Save to MongoDB and send email notification
    console.log('New Contact:', { fullName, email, phone, subject, message });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully. We will contact you within 24 hours.',
      data: {
        fullName,
        email,
        phone,
        subject,
        submittedAt: new Date(),
      }
    });
  } catch (error) {
    console.error('Error submitting contact:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
