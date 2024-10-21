// src/socket.js
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';  // Replace with your backend URL




// Initialize a socket connection
const socket = io(SOCKET_URL, {
  transports: ['websocket'],  // Ensure WebSocket is used for faster communication
  autoConnect: false,  // Avoid automatic connection; connect only when needed
});

export default socket;
