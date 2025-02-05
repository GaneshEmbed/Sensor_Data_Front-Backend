import { createServer } from 'http'; // Importing the HTTP module to create an HTTP server
import { Server } from 'socket.io'; // Importing Socket.IO for real-time bidirectional communication
import { WebSocketServer } from 'ws'; // Importing the WebSocket server

import app from './app'; // Importing the Express application instance
import { retryDatabaseConnection } from './utils/dbUtils'; // Importing utility function for retrying database connections
import { MONGO_URI_PRIMARY, MONGO_URI_BACKUP, PORT } from './config'; // Importing database URIs and server port from config

// Create an HTTP server using the Express app
const httpServer = createServer(app);

// Initialize Socket.IO with CORS settings
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Allow all origins (Should be restricted in production for security reasons)
  },
});

// Store the Socket.IO instance in the Express app for use in other modules
app.set('io', io);

// Initialize a WebSocket server and attach it to the HTTP server
export const wss = new WebSocketServer({ server: httpServer });
app.set('wss', wss);

// WebSocket connection event listener
wss.on('connection', (ws) => {
  console.log('A client connected via WebSocket.');

  // Handle incoming messages from the client
  ws.on('message', async (message) => {
    console.log('Received data from client:', message.toString());

    try {
      const parsedData = JSON.parse(message.toString()); // Parse the incoming JSON message
      parsedData.timestamp = new Date(); // Append a timestamp to the received data

      // Forward the received data to the API for storage in MongoDB
      const response = await fetch(`http://localhost:${PORT}/api/sensor/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      const responseData = await response.text();
      ws.send(responseData); // Send response back to the WebSocket client

      // Broadcast the newly received sensor data to all connected Socket.IO clients
      io.emit('newSensorData', parsedData);
    } catch (error: any) {
      console.error('Error processing client data:', error.message);
      ws.send('Error processing data.'); // Notify the client of an error
    }
  });

  // Handle WebSocket client disconnection
  ws.on('close', () => {
    console.log('Client disconnected.');
  });

  // Handle WebSocket errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error.message);
  });
});

// Socket.IO connection event listener
io.on('connection', (socket) => {
  console.log('A client connected via Socket.IO');

  // Handle Socket.IO client disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// Attempt to establish a connection to the primary database
retryDatabaseConnection(MONGO_URI_PRIMARY)
  .then(() => {
    // Start the server if the primary database connection is successful
    httpServer.listen(PORT, () => {
      console.log(`HTTP/WebSocket/Socket.IO server running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log('Primary DB failed. Trying backup DB...');

    // Attempt to connect to the backup database if the primary fails
    retryDatabaseConnection(MONGO_URI_BACKUP)
      .then(() => {
        httpServer.listen(PORT, () => {
          console.log(`HTTP/WebSocket/Socket.IO server running on port ${PORT} using backup DB`);
        });
      })
      .catch((error: any) => {
        console.error('Both primary and backup database connections failed:', error);
      });
  });
