const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const adminRoutes = require('./routes/admin');
// const formRoutes = require('./routes/forms'); // Uncomment after creating the file

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);

// TODO: Create these routes to match frontend api.js
// app.post('/api/contact', formRoutes.contactController);
// app.post('/api/applications', formRoutes.applicationController);

// Health
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', time: new Date().toISOString() });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
