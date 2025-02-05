import mongoose from 'mongoose';                                      // Importing mongoose to interact with MongoDB
import net from 'net';                                                // Importing Node.js 'net' module for TCP connections
import app from './app';                                              // Importing the configured Express app
import { MONGO_URI_PRIMARY, MONGO_URI_BACKUP, PORT } from './config'; // Importing MongoDB URIs and server port from the config file

// Function to attempt connecting to a database with retry logic
const retryDatabaseConnection = async (uri: string, retries: number = 5, delay: number = 5000): Promise<void> => {
  try {
    console.log(`Trying to connect to: ${uri}`);  // Log the URI being used to establish the connection
    await mongoose.connect(uri);                  // Attempt to connect to the provided URI using mongoose
    console.log(`Connected to database: ${uri}`); // Log success message if connection is successful
  } catch (error: any) {
    console.error(`Connection failed for ${uri}:`, error.message); // Log the error message if connection fails
    if (retries > 0) {
      console.log(`Retrying to connect to ${uri}... Attempts left: ${retries}`); // Inform about the retry attempt
      await new Promise(resolve => setTimeout(resolve, delay));    // Await the specified delay before retrying
      await retryDatabaseConnection(uri, retries - 1, delay);      // Recursively retry the connection with a reduced retry count
    } else {
      console.error(`Failed to connect to database after multiple attempts: ${uri}`); // Log failure message if retry attempts are exhausted
      throw error;                                                 // Throw error to indicate failure after all retries
    }
  }
};

// TCP server configuration
const TCP_PORT = 4000;       // Port for TCP connection
const TCP_HOST = '0.0.0.0';  // Bind to all available IP addresses

// Create a TCP server
const tcpServer = net.createServer((socket) => {
  console.log('Client connected via TCP.');

  // Handle incoming data from the client
  socket.on('data', (data) => {
    console.log('Received data from client:', data.toString());

    // Example: Echo the received data back to the client
    const response = `Server received: ${data.toString()}`;
    socket.write(response);
    console.log('Sent response to client:', response);
  });

  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected.');
  });

  // Handle socket errors
  socket.on('error', (error) => {
    console.error('TCP socket error:', error.message);
  });
});

// Start the TCP server
tcpServer.listen(TCP_PORT, TCP_HOST, () => {
  console.log(`TCP server running on ${TCP_HOST}:${TCP_PORT}`);
});

// Attempt to connect to the primary database first
retryDatabaseConnection(MONGO_URI_PRIMARY)
  .then(() => {
    // Once primary DB is connected, start the HTTP server
    app.listen(PORT, () => {
      console.log(`HTTP server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    // If primary DB fails, attempt to connect to the backup database
    console.log('Primary DB failed. Trying backup DB...');
    retryDatabaseConnection(MONGO_URI_BACKUP)
      .then(() => {
        app.listen(PORT, () => {
          console.log(`HTTP server is running on port ${PORT} using backup DB`);
        });
      })
      .catch((error) => {
        console.error('Both primary and backup database connections failed:', error); // If both DBs fail
      });
  });
