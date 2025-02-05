import { createServer } from 'http'; // Importing 'http' module for creating an HTTP server
import { Server } from 'socket.io'; // Importing Socket.IO
import { WebSocketServer } from 'ws'; // Importing WebSocket server
import app from './app'; // Importing the Express app
import { retryDatabaseConnection } from './utils'; // Import retry logic utility
import { MONGO_URI_PRIMARY, MONGO_URI_BACKUP, PORT } from './config'; // Importing MongoDB URIs and server port from the config file

// Create an HTTP server from the Express app
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Allow all origins (update this in p roduction!)
  },
});

// Create a WebSocket server
const wss = new WebSocketServer({ server: httpServer });

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('A client connected via WebSocket.');

  // Handle incoming messages from the client
  ws.on('message', async (message) => {
    console.log('Received data from client:', message.toString());

    try {
      const parsedData = JSON.parse(message.toString()); // Parse the JSON string received from the client
      parsedData.timestamp = new Date(); // Add a timestamp to the received data

      // Send the data to the HTTP server for storing in MongoDB
      const response = await fetch(`http://localhost:${PORT}/api/sensor/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      const responseData = await response.text();
      ws.send(responseData); // Send a response back to the WebSocket client

      // Broadcast the new data to all Socket.IO clients
      io.emit('newSensorData', parsedData); // Emit the parsed data to all connected Socket.IO clients
    } catch (error: any) {
      console.error('Error processing client data:', error.message);
      ws.send('Error processing data.');
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected.');
  });

  // Handle WebSocket errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error.message);
  });
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A client connected via Socket.IO');
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// Attempt to connect to the primary database first
retryDatabaseConnection(MONGO_URI_PRIMARY)
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`HTTP/WebSocket/Socket.IO server running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log('Primary DB failed. Trying backup DB...');
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