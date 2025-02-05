// Importing necessary modules
import cors from 'cors';                          // CORS middleware to handle Cross-Origin Resource Sharing
import bodyParser from 'body-parser';             // Middleware to parse incoming JSON request bodies
import express, { Application } from 'express';   // Express framework and Application type for type safety

import authRoutes from './routes/auth';           // Importing authentication routes
import sensorRoutes from './routes/sensorRoutes'; // Importing sensor-related routes

// Creating an Express application instance with TypeScript type checking
const app: Application = express();

app.use(cors());                                  // Enable CORS to allow cross-origin requests
app.use(bodyParser.json());                       // Middleware to parse JSON payloads in incoming requests

// Registering API routes
app.use('/api/auth', authRoutes);                 // Mount authentication routes at '/api/auth'
app.use('/api/sensor', sensorRoutes);             // Mount sensor-related routes at '/api/sensor'

// Export the configured Express app instance for use in other modules (e.g., server.ts)
export default app;
