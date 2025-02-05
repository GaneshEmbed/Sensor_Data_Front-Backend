import mongoose from 'mongoose';             // Importing mongoose to interact with MongoDB
import app from './app';                     // Importing the configured Express app
import { MONGO_URI_PRIMARY, MONGO_URI_BACKUP, PORT } from './config';  // Importing MongoDB URIs and server port from the config file

// Function to attempt connecting to a database
const connectToDatabase = async (uri: string) => {
  try {
    await mongoose.connect(uri);           // Trying to connect to the given URI
    console.log(`Connected to database: ${uri}`);  // Success message when connected
  } catch (error) {
    console.error(`Database connection failed for ${uri}:`, error);  // Logging error if connection fails
    throw error;  // Throwing the error to be caught in the fallback mechanism
  }
};

// Attempt to connect to the primary database first
connectToDatabase(MONGO_URI_PRIMARY)
  .then(() => {
    // Once primary DB is connected, start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);  // Success message when server starts
    });
  })
  .catch(async () => {
    // If primary DB fails, attempt to connect to the backup database
    console.log('Attempting to connect to the backup database...');
    try {
      await connectToDatabase(MONGO_URI_BACKUP);   // Trying to connect to backup DB
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} using backup DB`);  // Success message when server starts
      });
    } catch (error) {
      console.error('Both primary and backup database connections failed:', error);  // If both DBs fail
    }
  });
