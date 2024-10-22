


const ChatHistory = () => {



  const actorId = 'actor123'; // Replace with the actual actor ID
  const adminId = 'admin1'; // Replace with the actual admin ID


  
  async function loadChatHistory(room) {
    const response = await fetch(`http://localhost:5000/chat-history/${room}`);
    const chatHistory = await response.json();
  
    chatHistory.forEach((msg) => {
      console.log(`[${msg.timestamp}] ${msg.sender} to ${msg.receiver}: ${msg.message}`);
    });
  }
  

  return (
    <div className="chat-container">
        <h1 onClick={() => loadChatHistory(`${actorId}-${adminId}`)}>test</h1>
    </div>
  );
};

export default ChatHistory;
////
/* eslint-disable react/prop-types */
// src/components/Chat.jsx

// import { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

// // Random ID Generator Function
// const generateUniqueId = (prefix) => {
//   const randomPart = Math.floor(Math.random() * 10000); // Random 4-digit number
//   const timestamp = Date.now(); // Current timestamp
//   return `${prefix}-${timestamp}-${randomPart}`;
// };

// const ChatAdminToActor = ({ userRole }) => {
//   const adminSocket =io('http://localhost:5000/actor-admin-chat'); // Ref to avoid reconnecting
//   // const adminSocket = useRef(io('http://localhost:5000/actor-admin-chat')); // Ref to avoid reconnecting
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);


//   // Generate and store actor and admin IDs once to reuse throughout
//   const actorId = generateUniqueId('actor');
//   const adminId = generateUniqueId('admin');
//   // const actorId = useRef(generateUniqueId('actor')).current;
//   // const adminId = useRef(generateUniqueId('admin')).current;


//    // Determine the sender and receiver dynamically based on user role
//    const senderId = userRole === 'admin' ? adminId : actorId;
//    const receiverId = userRole === 'admin' ? actorId : adminId;
//   useEffect(() => {
//     const room = `${actorId}-${adminId}`; // Consistent room ID
//     console.log(`Joining Room: ${room}`);

//     // Join the room once
//     adminSocket.current.emit('joinRoom', { actorId, adminId });

//     // Listen for new messages
//     adminSocket.on('newMessage', (data) => {
//       console.log(`New message from ${data.sender}: ${data.message}`);
//       setMessages((prev) => [...prev, `${data.sender}: ${data.message}`]);
//     });
//     // adminSocket.current.on('newMessage', (data) => {
//     //   console.log(`New message from ${data.sender}: ${data.message}`);
//     //   setMessages((prev) => [...prev, `${data.sender}: ${data.message}`]);
//     // });

//     // Cleanup on unmount
//     return () => {
//       adminSocket.off('newMessage');
//       // adminSocket.current.off('newMessage');
//     };
//   }, [actorId, adminId]);

//   const sendMessage = () => {
//     const room = `${actorId}-${adminId}`; // Same room ID used
//     console.log(`Sending message to Room: ${room}`);

//     // Emit the message with sender details
//     // adminSocket.current.emit('message', {
//     adminSocket.emit('message', {
//       actorId,
//       adminId,
//       message,
//       sender: senderId,
//       receiver: receiverId,
//       // senderRole: userRole,
//       // receiverRole: userRole,
//     });

//     setMessage(''); // Clear input
//   };

//   return (
//     <div className="chat-container">
//     <h2>Chat Room to Admin - Actor</h2>
//     <div className="messages">
//       {messages.map((msg, index) => (
//         <p key={index} style={{ textAlign: msg.sender === actorId ? 'right' : 'left', color: msg.sender === actorId ? 'blue' : 'green' }}>
//           <strong>{msg.senderRole}:</strong> {msg.message}
//         </p>
//       ))}
//     </div>
//     <input
//       type="text"
//       value={message}
//       onChange={(e) => setMessage(e.target.value)}
//       placeholder="Enter your message"
//     />
//     <button onClick={sendMessage}>Send</button>
//   </div>
//     // <div className="chat-container">
//     //    <h2>Chat Room to Admin - Actor</h2>

//     //   <div className="messages">
//     //     {messages.map((msg, index) => (
//     //       <p key={index}>{msg}</p>
//     //     ))}
//     //   </div>
//     //   <input
//     //     type="text"
//     //     value={message}
//     //     onChange={(e) => setMessage(e.target.value)}
//     //     placeholder="Enter your message"
//     //   />
//     //   <button onClick={sendMessage}>Send</button>
//     // </div>
//   );
// };

// export default ChatAdminToActor;


