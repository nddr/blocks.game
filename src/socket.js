const socket = new WebSocket('ws://localhost:8080/ws');

socket.onopen = () => {
  console.log('Connected to WebSocket server');
};

socket.onmessage = (event) => {
  console.log('Message from server:', event.data);

  // check for message type
};

socket.onerror = (error) => {
  console.log('WebSocket Error:', error);
};

socket.onclose = () => {
  console.log('WebSocket connection closed');
};

function send() {
  if (socket.readyState === WebSocket.OPEN) socket.send('Hello from Client!');
  else console.log('WebSocket not open');
}