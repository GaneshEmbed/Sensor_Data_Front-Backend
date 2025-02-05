import mongoose from 'mongoose'; // Importing mongoose to interact with MongoDB
import app from './app';          // Importing the configured Express app
import { MONGO_URI_PRIMARY, MONGO_URI_BACKUP, PORT } from './config'; // Importing MongoDB URIs and server port from the config file

// Function to attempt connecting to a database with retry logic
const retryDatabaseConnection = async (uri: string, retries: number = 5, delay: number = 5000): Promise<void> => {
  try {
    console.log(`Trying to connect to: ${uri}`); // Log the URI being used
    await mongoose.connect(uri);         // Trying to connect to the given URI
    console.log(`Connected to database: ${uri}`); // Success message when connected
  } catch (error: any) {
    console.error(`Connection failed for ${uri}:`, error.message);
    if (retries > 0) {
      console.log(`Retrying to connect to ${uri}... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, delay)); // Await the timeout before retrying
      await retryDatabaseConnection(uri, retries - 1, delay); // Retrying after delay
    } else {
      console.error(`Failed to connect to database after multiple attempts: ${uri}`);
      throw error; // Throwing error if retries are exhausted
    }
  }
};

// Attempt to connect to the primary database first
retryDatabaseConnection(MONGO_URI_PRIMARY)
  .then(() => {
    // Once primary DB is connected, start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    // If primary DB fails, attempt to connect to the backup database
    console.log('Primary DB failed. Trying backup DB...');
    retryDatabaseConnection(MONGO_URI_BACKUP)
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT} using backup DB`);
        });
      })
      .catch((error) => {
        console.error('Both primary and backup database connections failed:', error); // If both DBs fail
      });
  });
