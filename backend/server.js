import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import applicationsRouter from './routes/applications.js';
import contactRouter from './routes/contact.js';
import projectsRouter from './routes/projects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Routes
app.use('/api', applicationsRouter);
app.use('/api', contactRouter);
app.use('/api', projectsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 CORS enabled for http://localhost:5173`);
});
