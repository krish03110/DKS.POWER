import express from 'express';

const router = express.Router();

// GET /api/projects - Fetch all projects
router.get('/projects', async (req, res) => {
  try {
    // Sample projects data
    const projects = [
      {
        id: 1,
        title: "Residential Solar 3kW",
        description: "Complete solar installation for home",
        image: "🏠",
        client: "Client Name 1",
        savings: "₹45,000/year"
      },
      {
        id: 2,
        title: "Commercial Solar 10kW",
        description: "Industrial rooftop solar system",
        image: "🏢",
        client: "Client Name 2",
        savings: "₹150,000/year"
      },
      {
        id: 3,
        title: "Agri Solar Pump",
        description: "Solar pump for agricultural use",
        image: "🌾",
        client: "Client Name 3",
        savings: "₹60,000/year"
      },
      {
        id: 4,
        title: "Community Solar",
        description: "Large scale community project",
        image: "⚡",
        client: "Client Name 4",
        savings: "₹250,000/year"
      }
    ];

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

export default router;
