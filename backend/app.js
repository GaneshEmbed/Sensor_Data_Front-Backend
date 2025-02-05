// Importing required libraries
const cors = require('cors'); // For handling Cross-Origin Resource Sharing (CORS)
const dotenv = require('dotenv'); // For environment variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // To parse incoming request bodies

// Loading environment variables from a .env file
dotenv.config();

// Creating an Express app
const app = express();

// Enabling CORS for all domains
app.use(cors());

// Middleware to parse JSON bodies from incoming requests
app.use(bodyParser.json());

// Connecting to MongoDB (make sure MongoDB is running)
mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Importing routes
const authRoutes = require('./routes/auth'); // Authentication routes

// Mounting routes
app.use('/api/auth', authRoutes); // Authentication and user profile routes

// Listening on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
