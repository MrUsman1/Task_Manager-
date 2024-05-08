// app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const connectDB = require('./config/db'); // Import the database connection

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', authRoutes);

module.exports = app;
