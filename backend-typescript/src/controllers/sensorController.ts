import { Request, Response } from 'express';
import SensorData from '../models/sensorData'; // Importing the SensorData model
import { WebSocket } from 'ws'; 

// Controller to handle saving sensor data to the database
export const saveSensorData = async (req: Request, res: Response): Promise<void> => {
  try {
    // Destructuring the sensor data from the request body
    const { temp1, temp2, humidity1, humidity2, relay1Status, relay2Status } = req.body;

    // Creating a new SensorData record with the data from the request
    const sensorRecord = new SensorData({
      temp1,
      temp2,
      humidity1,
      humidity2,
      relay1Status,
      relay2Status,
      timestamp: new Date(),  // Adding a timestamp for the record
    });

    // Saving the sensor data to the database
    await sensorRecord.save(); // Saving the sensor data

    // Sending a success response back to the client
    res.status(200).send('Data saved to database successfully.');
  } catch (error: any) {
    // Logging the error message and sending an error response
    console.error('Error saving sensor data:', error.message);
    res.status(500).send('Error saving sensor data.');
  }
};

// Controller to fetch the latest sensor data from the database
export const getSensorData = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetching the latest sensor data sorted by timestamp in descending order
    const latestSensorData = await SensorData.findOne().sort({ timestamp: -1 });
    
    if (!latestSensorData) {
      // Sending a response if no sensor data is found
      res.status(404).json({ success: false, message: 'No sensor data found.' });
      return; // Exit the function if no data is found
    }

    // Sending the latest sensor data as a response
    res.status(200).json({
      success: true,
      data: {
        temp1: latestSensorData.temp1,
        temp2: latestSensorData.temp2,
        humidity1: latestSensorData.humidity1,
        humidity2: latestSensorData.humidity2,
        relay1Status: latestSensorData.relay1Status,
        relay2Status: latestSensorData.relay2Status,
      },
    });
  } catch (error) {
    // Logging and sending an error response if fetching sensor data fails
    console.error('Error fetching sensor data:', error);
    res.status(500).json({ success: false, message: 'Error fetching sensor data' });
  }
};

export const updateRelayStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    // Destructure and parse the relay status values to ensure they are numbers
    const { relay1Status, relay2Status } = req.body;
    const parsedRelay1Status = relay1Status !== undefined ? Number(relay1Status) : undefined;
    const parsedRelay2Status = relay2Status !== undefined ? Number(relay2Status) : undefined;

    // Fetch the latest sensor data entry from the database
    const latestSensorData = await SensorData.findOne().sort({ timestamp: -1 });

    if (!latestSensorData) {
      res.status(404).json({ success: false, message: 'No sensor data found.' });
      return;
    }

    // Update relay status if provided in the request
    if (parsedRelay1Status !== undefined) latestSensorData.relay1Status = parsedRelay1Status;
    if (parsedRelay2Status !== undefined) latestSensorData.relay2Status = parsedRelay2Status;

    // Save the updated sensor data to the database
    const updatedData = await latestSensorData.save();

    // Get the WebSocket server instance from the app object
    const wss = req.app.get('wss'); // Ensure the WebSocket server is attached to the app

    if (!wss) {
      console.error('WebSocket server instance not found.');
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    // Broadcast the updated sensor data to all connected WebSocket clients
    wss.clients.forEach((client: any) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(updatedData));
      }
    });

    // Sending a success response with the updated data
    res.status(200).json({
      success: true,
      message: 'Relay status updated successfully',
      data: updatedData,
    });
  } catch (error: any) {
    console.error('Error updating relay status:', error);
    res.status(500).json({ success: false, message: 'Error updating relay status' });
  };
};
