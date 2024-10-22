// src/components/Chat.jsx

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const actorSocket = io('http://localhost:5000/actor-actor-chat'); // For admin chat



// const generateUniqueId = (prefix) => {
//     const randomPart = Math.floor(Math.random() * 10000); 
//     const timestamp = Date.now(); 
//     return `${prefix}-${timestamp}-${randomPart}`;
// };

// eslint-disable-next-line react/prop-types
const ChatActorToActor = ({UserRole}) => {
//   const socket = io('/actor-actor-chat');
const [message, setMessage] = useState('');
const [messages, setMessages] = useState([]);

const actor1 = "actor112345";
const actor2 = "actor212345";
// const actorId = generateUniqueId('actor');
// const adminId = generateUniqueId('admin');

const senderId = UserRole === 'admin' ? actor1 : actor2;
const receiverId = UserRole === 'admin' ? actor2 : actor1;




  
  useEffect(() => {
    
    actorSocket.emit('joinRoom', { actor1, actor2 });

    actorSocket.on('newMessage', (data) => {
        console.log(`New message from==musa ${data.sender}: ${data.message}, ${data}`);
        setMessages((prev) => [...prev, { sender: data.sender, message: data.message }]);
    });

    return () => {
      actorSocket.off('newMessage');
    };
}, [actor1, actor2, actorSocket]);



  const sendMessage = () => {
    const room = `${actor1}-${actor2}`;
    console.log(`Sending message to Room: ${room}`);
    
    if (actorSocket && actorSocket.connected) {
      actorSocket.emit('message', {
        actor1,
        actor2,
            message,
            sender: senderId,
            receiver: receiverId,
        });
        setMessage(''); // Clear input
    } else {
        console.error("Socket is not connected");
    }
};

  return (
<div className="chat-container">
<h2>Chat Room to Actor - Actor</h2>
<div className="messages">
    {messages.map((msg, index) => (
        <p key={index} style={{ textAlign: msg.sender === actor1 ? 'right' : 'left', color: msg.sender === actor1 ? 'blue' : 'green' }}>
            <strong>{msg.sender}:</strong> {msg.message}
        </p>
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
