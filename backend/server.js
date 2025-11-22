// server.js (production-ready)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const checksRouter = require('./routes/checks');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const app = express();

// Security middlewares
app.use(helmet());

// Logging: verbose in dev, minimal in production
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined')); // less verbose
} else {
  app.use(morgan('dev'));
}

// CORS: adjust origin in production if required
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*' // tighten this in production
}));

// Body parser with size limit to prevent very large payloads
app.use(express.json({ limit: '50kb' })); // adjust as needed

// Routes
app.use('/api/checks', checksRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// 404 and error middleware
app.use(notFound);
app.use(errorHandler);

// Start server (and export app for tests)
const PORT = process.env.PORT || 3001;

// create server so we can close it gracefully
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API running on port ${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);
});

// Graceful shutdown
function shutdown(signal) {
  console.log(`Received ${signal}. Closing HTTP server...`);
  server.close(err => {
    if (err) {
      console.error('Error during server.close', err);
      process.exit(1);
    }
    console.log('HTTP server closed. Exiting process.');
    process.exit(0);
  });

  // force exit if not closed within timeout
  setTimeout(() => {
    console.warn('Forcing shutdown after timeout.');
    process.exit(1);
  }, 30_000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// export app for testing (e.g., supertest)
module.exports = app;
