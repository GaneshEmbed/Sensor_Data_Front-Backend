import express from 'express';                     // Import express module
import http from 'http';                           // Import http module to create the server
import { Server } from 'socket.io';                // Import socket.io
import { retryDatabaseConnection } from './utils'; // Import retry logic utility
import { MONGO_URI_PRIMARY, MONGO_URI_BACKUP, PORT } from './config'; // Import config for DB and server port

import app from './app';                           // Import express app for HTTP server
import sensorRoutes from './routes/sensorRoutes';  // Import sensor routes

const server = http.createServer(app);            // Create an HTTP server using the express app
const io = new Server(server);                   // Initialize socket.io with the server

// TCP server configuration
const TCP_PORT = 4000;        // Port for TCP connection
const TCP_HOST = '0.0.0.0';   // Bind to all available IP addresses

// Create a TCP server for receiving sensor data
const tcpServer = net.createServer((socket) => {
  console.log('Client connected via TCP.');

  // Handle incoming data from the client
  socket.on('data', async (data) => {
    console.log('Received data from client:', data.toString());

    try {
      const parsedData = JSON.parse(data.toString()); // Parse JSON data
      parsedData.timestamp = new Date();              // Add timestamp

      // Emit the data via socket.io to all connected clients
      io.emit('sensorData', parsedData);

      // Send the data to the HTTP server for saving to MongoDB
      const response = await fetch(`http://localhost:${PORT}/api/sensor/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      const responseData = await response.text();
      socket.write(responseData); // Send response back to TCP client
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
    // Start the HTTP server once the DB connection is successful
    server.listen(PORT, () => {
      console.log(`HTTP server running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log('Primary DB failed. Trying backup DB...');
    retryDatabaseConnection(MONGO_URI_BACKUP)
      .then(() => {
        server.listen(PORT, () => {
          console.log(`HTTP server running on port ${PORT} using backup DB`);
        });
      })
      .catch((error: any) => {
        console.error('Both primary and backup database connections failed:', error);
      });
  });

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('A user connected via Socket.IO');

  // Handle disconnection event
  socket.on('disconnect', () => {
    console.log('User disconnected from Socket.IO');
  });
});

