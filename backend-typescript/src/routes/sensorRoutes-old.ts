import { Router } from 'express'; // Import Express Router to define API routes

// Import sensor-related controllers
import { 
    saveSensorData, 
    getSensorData, 
    updateRelayStatus 
} from '../controllers/sensorController';

const router = Router(); // Create an instance of Router to define and manage API endpoints

/** 
 * Sensor Data Routes 
 * These routes handle operations related to sensor data.
 */
router.post('/save', saveSensorData);  // Save incoming sensor data
router.get('/data', getSensorData);    // Fetch the latest sensor data

/** 
 * Relay Control Routes 
 * This route manages relay status updates.
 */
router.put('/update-relay', updateRelayStatus); // Update relay status

export default router; // Export the configured router for use in the main application
