import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// const generateUniqueId = (prefix) => {
//     const randomPart = Math.floor(Math.random() * 10000); 
//     const timestamp = Date.now(); 
//     return `${prefix}-${timestamp}-${randomPart}`;
// };
const adminSocket = io('http://localhost:5000/actor-admin-chat'); // Using ref

// eslint-disable-next-line react/prop-types
const ChatAdminToActor = ({ userRole }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const actorId = "actor12345";
    const adminId = "admin12345";
    // const actorId = generateUniqueId('actor');
    // const adminId = generateUniqueId('admin');

    const senderId = userRole === 'admin' ? adminId : actorId;
    const receiverId = userRole === 'admin' ? actorId : adminId;


    const fetchChatHistory = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/chat/history?actorId=${actorId}&adminId=${adminId}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };


    useEffect(() => {

        fetchChatHistory();

        const room = `${actorId}-${adminId}`;
        console.log(`Joining Room: ${room}`);
        
        adminSocket.emit('joinRoom', { actorId, adminId });

        adminSocket.on('newMessage', (data) => {
            console.log(`New message from==musa ${data.sender}: ${data.message}, ${data}`);
            setMessages((prev) => [...prev, { sender: data.sender, message: data.message }]);
        });

        return () => {
            adminSocket.off('newMessage');
        };
    }, [actorId, adminId, adminSocket]);

    const sendMessage = () => {
        const room = `${actorId}-${adminId}`;
        console.log(`Sending message to Room: ${room}`);
        
        if (adminSocket && adminSocket.connected) {
            adminSocket.emit('message', {
                actorId,
                adminId,
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
            <h2>Chat Room to Admin - Actor</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <p key={index} style={{ textAlign: msg.sender === actorId ? 'right' : 'left', color: msg.sender === actorId ? 'blue' : 'green' }}>
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

export default ChatAdminToActor;
