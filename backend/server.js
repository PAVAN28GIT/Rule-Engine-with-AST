const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from config.env
dotenv.config({ path: './config.env' });

// Import and connect to MongoDB
const connectToMongo = require('./db');
connectToMongo();

const app = express();

// Middlewares
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

const ruleRoutes = require('./routes/ruleRoutes.js');

// Home route
app.get('/', (req, res) => {
  res.send('The Rule Engine backend');
});

// rule routes for the API
app.use('/api/rules', ruleRoutes);

// Define the PORT
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
