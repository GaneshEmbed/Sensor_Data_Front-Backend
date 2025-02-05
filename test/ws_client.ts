import WebSocket from 'ws'; // Import WebSocket library

const WS_URL = 'ws://192.168.1.51:5000'; // WebSocket server URL

// Create a WebSocket client
const ws = new WebSocket(WS_URL);

// Function to generate random temperature, humidity, and relay values
const generateData = () => {
  const temp1 = (Math.random() * 40).toFixed(2); // Random temperature value 1
  const temp2 = (Math.random() * 40).toFixed(2); // Random temperature value 2
  const humidity1 = (Math.random() * 100).toFixed(2); // Random humidity value 1
  const humidity2 = (Math.random() * 100).toFixed(2); // Random humidity value 2
  const relay1Status = Math.floor(Math.random() * 3); // Random relay1 status (0: off, 1: on, 2: pulse)
  const relay2Status = Math.floor(Math.random() * 3); // Random relay2 status (0: off, 1: on, 2: pulse)

  return { temp1, temp2, humidity1, humidity2, relay1Status, relay2Status };
};

// Handle WebSocket connection open
ws.on('open', () => {
  console.log(`Connected to WebSocket server at ${WS_URL}`);

  // Function to send data to the server every 5 seconds
  setInterval(() => {
    const data = generateData();
    const message = JSON.stringify(data); // Convert the data object to JSON string
    console.log('Sending data to server:', message);
    ws.send(message); // Send the message to the server
  }, 5000);
});

// Handle messages received from the server
ws.on('message', (data) => {
  console.log('Received response from server:', data.toString());
});

// Handle WebSocket connection close
ws.on('close', () => {
  console.log('Connection closed.');
});

// Handle WebSocket errors
ws.on('error', (error) => {
  console.error('WebSocket error:', error.message);
});