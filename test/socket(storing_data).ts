import net from 'net';                                                // Importing Node.js 'net' module for TCP connections
import mongoose from 'mongoose';                                      // Importing mongoose to interact with MongoDB
import { retryDatabaseConnection } from './utils/retryDatabaseConnection'; // Import retry logic utility
import app from './app';                                              // Importing the Express app
import { MONGO_URI_PRIMARY, MONGO_URI_BACKUP, PORT } from './config'; // Importing MongoDB URIs and server port from the config file

// TCP server configuration
const TCP_PORT = 4000;       // Port for TCP connection
const TCP_HOST = '0.0.0.0';  // Bind to all available IP addresses

// Create a TCP server
const tcpServer = net.createServer((socket) => {
  console.log('Client connected via TCP.');

  // Handle incoming data from the client
  socket.on('data', async (data) => {
    console.log('Received data from client:', data.toString());

    try {
      const parsedData = JSON.parse(data.toString()); // Parse the JSON string received from the client
      parsedData.timestamp = new Date();             // Add a timestamp to the received data

      // Send the data to the HTTP server for storing in MongoDB
      // You can use fetch or axios to send a POST request to the server
      const response = await fetch(`http://localhost:${PORT}/api/sensor/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedData)
      });

      const responseData = await response.text();
      socket.write(responseData);
    } catch (error) {
      console.error('Error processing client data:', error.message);
      socket.write('Error processing data.');
    }
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
    app.listen(PORT, () => {
      console.log(`HTTP server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log('Primary DB failed. Trying backup DB...');
    retryDatabaseConnection(MONGO_URI_BACKUP)
      .then(() => {
        app.listen(PORT, () => {
          console.log(`HTTP server is running on port ${PORT} using backup DB`);
        });
      })
      .catch((error) => {
        console.error('Both primary and backup database connections failed:', error);
      });
  });
