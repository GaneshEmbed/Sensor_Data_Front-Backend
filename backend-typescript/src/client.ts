import WebSocket from 'ws'; // Import WebSocket library

const WS_URL = 'ws://192.168.1.51:5000'; // WebSocket server URL

// Create a WebSocket client instance
const ws = new WebSocket(WS_URL);

/**
 * Generates random sensor data including temperature, humidity, and relay statuses.
 * @returns {Object} An object containing temperature, humidity, and relay status values.
 */
const generateData = () => {
  const temp1 = (Math.random() * 40).toFixed(2); // Generate a random temperature value (0 - 40°C)
  const temp2 = (Math.random() * 40).toFixed(2); // Generate a second random temperature value
  const humidity1 = (Math.random() * 100).toFixed(2); // Generate a random humidity value (0 - 100%)
  const humidity2 = (Math.random() * 100).toFixed(2); // Generate a second random humidity value
  const relay1Status = Math.floor(Math.random() * 3); // Random relay1 status (0: off, 1: on, 2: pulse)
  const relay2Status = Math.floor(Math.random() * 3); // Random relay2 status (0: off, 1: on, 2: pulse)

  return { temp1, temp2, humidity1, humidity2, relay1Status, relay2Status };
};

// Event listener for WebSocket connection open
ws.on('open', () => {
  console.log(`Connected to WebSocket server at ${WS_URL}`);

  // Send sensor data to the server every 10 seconds
  setInterval(() => {
    const data = generateData();
    const message = JSON.stringify(data); // Convert the data object to a JSON string
    console.log('Sending data to server:', message);
    ws.send(message); // Transmit the message to the WebSocket server
  }, 10000);
});

// Event listener for receiving messages from the WebSocket server
ws.on('message', (data) => {
  console.log('Received response from server:', data.toString());
});

// Event listener for WebSocket connection closure
ws.on('close', () => {
  console.log('WebSocket connection closed.');
});

// Event listener for WebSocket errors
ws.on('error', (error) => {
  console.error('WebSocket error:', error.message);
});
