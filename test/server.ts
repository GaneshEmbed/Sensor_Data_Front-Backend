// Importing necessary modules
import mongoose from 'mongoose';             // Importing mongoose to interact with MongoDB
import app from './app';                     // Importing the configured Express app
import { MONGO_URI, PORT } from './config';  // Importing MongoDB URI and server port from the config file

// Connecting to MongoDB
mongoose
  .connect(MONGO_URI)                     // Initiating the connection to MongoDB using the connection string from config
  .then(() => {
    console.log('Connected to MongoDB');  // Logging success message once connected to MongoDB

    // Starting the Express server after successful database connection
    app.listen(PORT, () => {                             // Listening on the specified port from config
      console.log(`Server is running on port ${PORT}`);  // Logging success message when server starts
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);  // Logging any error that occurs during the MongoDB connection
  });
