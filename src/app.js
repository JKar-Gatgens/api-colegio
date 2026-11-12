// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const calificacionRoutes = require('./routes/calificacionRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', calificacionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});