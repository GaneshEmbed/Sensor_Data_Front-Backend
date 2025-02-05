import mongoose from 'mongoose';

/**
 * Attempts to establish a connection to a MongoDB database with retry logic.
 *
 * @param {string} uri - The MongoDB URI to connect to.
 * @param {number} [retries=5] - The number of retry attempts before failing.
 * @param {number} [delay=5000] - The delay (in milliseconds) between retry attempts.
 *
 * The function will attempt to connect recursively until the retries are
 * exhausted or the connection is successfully established.
 */
export const retryDatabaseConnection = async (
  uri: string, 
  retries: number = 5, 
  delay: number = 5000
): Promise<void> => {
  try {
    console.log(`Attempting to connect to database: ${uri}`); 
    await mongoose.connect(uri); // Try to establish the connection
    console.log(`Successfully connected to database: ${uri}`);
  } catch (error: any) {
    console.error(`Database connection failed (${uri}):`, error.message);
    
    if (retries > 0) {
      console.log(`Retrying connection... Attempts remaining: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
      await retryDatabaseConnection(uri, retries - 1, delay);   // Recursive retry
    } else {
      console.error(`All retry attempts exhausted. Unable to connect to database: ${uri}`);
      throw error; // Throw error after all retries have been attempted
    }
  }
};
