// src/components/Chat.jsx

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';


// eslint-disable-next-line react/prop-types
const ChatActorToActor = () => {
  const actorSocket = io('http://localhost:5000/actor-actor-chat'); // For admin chat
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
//   const socket = io('/actor-actor-chat');

const actor1 = 'actor1'; // Replace with the actual actor ID
const actor2 = 'actor2';

  useEffect(() => {
    actorSocket.emit('joinRoom', { actor1, actor2 });

    actorSocket.on('newMessage', (data) => {
      console.log(`New message from ${data.sender}: ${data.message}`);
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
        actorSocket.off('newMessage');
    };
  }, []);

  const sendMessage = () => {
    const room = `${actor1}-${actor2}`; // Construct the room name
    console.log(room)
    actorSocket.emit('message', { actor1, actor2, message });
    setMessage('');
  };

  return (
    <div className="chat-container">
      <h2>Chat Room to Actor - Actor</h2>
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

export default ChatActorToActor;
