import axios from 'axios';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const adminSocket = io('http://localhost:5000/actor-admin-chat');

// eslint-disable-next-line react/prop-types
const ChatAdminToActor = ({ userRole }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]); 


    const actorId = "actor12345";
    const adminId = "admin12345";
    const room = `${actorId}-${adminId}`;


    const senderId = userRole === 'admin' ? adminId : actorId;
    const receiverId = userRole === 'admin' ? actorId : adminId;


    const fetchChatHistory = async () => {
        try {
            const response = await axios.get(`/api/v1/chats/messages?room=${room}`);
            console.log('API Response:=========', response.data);
            if (response.data && response.data.messages) {
                setMessages(response.data);
            } else {
                console.error('No messages found in the response');
            }

        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };
    useEffect(() => {

        fetchChatHistory();

        adminSocket.emit('joinRoom', { room });
        console.log(`Joined room: ${room}`);



        adminSocket.on('newMessage', (data) => {
            // setMessages((prev) => [...prev, { sender: data.sender, message: data.message }]);
            setMessages((prev) => [...prev, data]);

        });

        return () => {
            adminSocket.off('newMessage');
        };
    }, [room]);

    const sendMessage = () => {        
        
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
