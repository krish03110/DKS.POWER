const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

const projectRoutes = require('./routes/projects');
const adminRoutes = require('./routes/admin');

const applicationRoutes = require('./routes/applications');
const contactRoutes = require('./routes/contact');

const app = express();

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));

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
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);


app.use('/api/applications', applicationRoutes);
app.use('/api/contact', contactRoutes);

// Health
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', time: new Date().toISOString() });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
