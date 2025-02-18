import { createServer } from 'http';
import { Server } from 'socket.io';
import { WebSocketServer } from 'ws';
import express, { Request, Response } from 'express';

import app from './app'; // Import Express app
import { retryDatabaseConnection } from './utils/dbUtils';
import { MONGO_URI_PRIMARY, PORT } from './config';

import authRoutes from './routes/auth';
import sensorRoutes from './routes/sensorRoutes';
import dataRoutes from './routes/data';

// Add a default route to check if the backend is running
app.get('/', (req: Request, res: Response) => {
  res.send('✅ Backend (TypeScript) is running successfully!');
});

// Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/sensor', sensorRoutes);
app.use('/api', dataRoutes);

// Create HTTP Server
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, { cors: { origin: '*' } });
app.set('io', io);

// Initialize WebSocket Server
export const wss = new WebSocketServer({ server: httpServer as any });
app.set('wss', wss);

// Attempt MongoDB connection
retryDatabaseConnection(MONGO_URI_PRIMARY)
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
  });
