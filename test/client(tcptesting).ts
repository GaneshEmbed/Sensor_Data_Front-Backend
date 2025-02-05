import net from 'net';

const TCP_PORT = 4000; // Port of the TCP server
const TCP_HOST = '127.0.0.1'; // Host of the TCP server

// Create a TCP client
const client = new net.Socket();

// Connect to the TCP server
client.connect(TCP_PORT, TCP_HOST, () => {
  console.log(`Connected to TCP server at ${TCP_HOST}:${TCP_PORT}`);

  // Send data to the server
  const message = 'Hello, TCP Server!';
  console.log('Sending message to server:', message);
  client.write(message);
});

// Handle data received from the server
client.on('data', (data) => {
  console.log('Received response from server:', data.toString());

  // Close the client after receiving the response
  client.end();
});

// Handle client disconnection
client.on('close', () => {
  console.log('Connection closed.');
});

// Handle errors
client.on('error', (error) => {
  console.error('TCP client error:', error.message);
});
