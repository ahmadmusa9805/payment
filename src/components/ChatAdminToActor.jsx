// src/components/Chat.jsx

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';


const ChatAdminToActor = () => {
  const adminSocket = io('http://localhost:5000/actor-admin-chat'); // For admin chat
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);


  const actorId = 'actor123'; // Replace with the actual actor ID
  const adminId = 'admin1'; // Replace with the actual admin ID

  useEffect(() => {

    adminSocket.emit('joinRoom', { actorId, adminId });

    adminSocket.on('newMessage', (data) => {
      console.log(`New message from ${data.sender}: ${data.message}`);
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      adminSocket.off('newMessage'); // Clean up the listener
    };
  }, []);
  
  const sendMessage = () => {
    const room = `${actorId}-${adminId}`; // Construct the room name
    console.log(room)
    adminSocket.emit('message', { actorId, adminId, message });
    setMessage('');
  };

  return (
    <div className="chat-container">
       <h2>Chat Room to Admin - Actor</h2>

      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatAdminToActor;
