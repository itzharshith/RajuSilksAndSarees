const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
require('dotenv').config();

// Initialize DB Connection
connectDB();

const app = express();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false // Allows serving static uploads folder
}));

// CORS Configuration: Dynamic check supporting same-domain on production (Vercel) & local development
const corsOptionsDelegate = (req, callback) => {
  const origin = req.header('Origin');
  const host = req.header('Host');
  
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.FRONTEND_URL
  ].filter(Boolean);

  let isAllowed = false;
  if (!origin) {
    isAllowed = true;
  } else if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
    isAllowed = true;
  } else {
    try {
      const originHost = new URL(origin).host;
      if (originHost === host) {
        isAllowed = true;
      }
    } catch (e) {
      isAllowed = false;
    }
  }

  const corsOptions = isAllowed 
    ? { origin: true, credentials: true }
    : { origin: false };
    
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

// Rate limiting: general protection
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { message: 'Too many requests, please try again after 15 minutes.' }
});
app.use('/api', generalLimiter);

// Stricter rate limits for auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many authentication attempts. Please try again after 15 minutes.' }
});
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/users/forgot-password', authLimiter);
app.use('/api/users/reset-password', authLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 FIXED: Changed from '/uploads' to '/api/uploads' so Vercel routes it to the backend service
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes mapping
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/couponRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root route
app.get('/api', (req, res) => {
  res.json({ message: 'Raju Silks & Sarees REST APIs are fully functional!' });
});

// 404 Route handler
app.use((req, res, next) => {
  res.status(404).json({ message: `API route not found: ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

module.exports = app;