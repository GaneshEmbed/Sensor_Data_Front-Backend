import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { PORT } from './config'; // Make sure PORT is defined in your config file

// Create HTTP server (required for WebSocket)
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running');
});

// Create WebSocket server attached to HTTP server
const wss = new WebSocketServer({ server });

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket server');
  
  // Message from client (Python or another client)
  ws.on('message', (message: string) => {
    console.log(`Received: ${message}`);
    // You can process the message and send a response
    ws.send('Message received');
  });

  // Handle WebSocket connection close
  ws.on('close', () => {
    console.log('Connection closed');
  });
});

// Start the server and listen on the specified port and IP address
const serverIp = '0.0.0.0';  // Listen on all available network interfaces
server.listen(PORT, serverIp, () => {
  console.log(`WebSocket server running on http://${serverIp}:${PORT}`);
});
