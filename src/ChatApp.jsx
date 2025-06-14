// ChatApp.jsx
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

export default function ChatApp({ userId }) {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // 1. Load rooms for the user
  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetch(`http://10.0.60.52:5001/api/v1/rooms/my-rooms/${userId}`);
      const data = await res.json();
    //   console.log(data?.data[0], "t1");
      setRooms(data?.data || []);
    //   console.log(rooms, "t2");
    };
    fetchRooms();
  }, [userId]);
  console.log(rooms, "t3");


  // 2. Join room & load messages
  const joinRoom = async (room) => {
    console.log(room?.roomId, "t4");
    setCurrentRoom(room);
    socket.emit("joinRoom", room?.roomId);

    // const res = await fetch(`http://10.0.60.52:5001/api/v1/messages/684bbcfe5bbf5d22f001853a/messages`);
    const res = await fetch(`http://10.0.60.52:5001/api/v1/messages/${room?.roomId}/messages`);
    const data = await res.json();

    console.log(data.data, "t5");
    setMessages(data?.data);
  };

  // 3. Listen for real-time messages
//   useEffect(() => {
//     socket.on("receiveMessage", (message) => {
//         console.log(message, "get recieve message");
//       setMessages((prev) => [...prev, message]);
//     });
//     return () => socket.off("receiveMessage");
//   }, []);
useEffect(() => {
  socket.on("receiveMessage", (message) => {
    if (currentRoom?.roomId === message.roomId) {
      setMessages((prev) => [...prev, message]);
    }

    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.roomId === message.roomId
          ? {
              ...room,
              lastMessage: message.text,
              lastMessageTime: message.createdAt,
              lastSender: message.senderName,
            }
          : room
      )
    );
  });

  return () => socket.off("receiveMessage");
}, [currentRoom]);


  // 4. Send message
  const sendMessage = () => {
    console.log(text, "t6", currentRoom);
    if (text && currentRoom) {
      socket.emit("sendMessage", {
        roomId: currentRoom?.roomId,
        userId,
        text
      });
      setText("");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 200 }}>
        <h3>My Rooms</h3>
        {rooms.map((room) => (
          <div key={room._id} onClick={() => joinRoom(room)} style={{ cursor: "pointer", marginBottom: 10}}>
           <div><strong>{room.familyName}</strong></div>
           {/* <div><strong>{messages[0]?.createdAt}</strong></div> */}
            {/* {console.log(room, "t7")}
            {console.log(messages[0]?.createdAt, "t8")} */}
      {room.lastMessage && (
        <div style={{ fontSize: "12px", color: "#555" }}>
          {room.lastMessage}
          {/* {room.lastSender}: {room.lastMessage} */}
          <br />
          <div style={{ fontSize: "11px", color: "#888" }}>
          {room.lastMessageTime
            ? new Date(room.lastMessageTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : ""}
        </div>
        </div>
      )}


          </div>
        ))}
      </div>
      <div style={{ marginLeft: 20, textAlign: "left" }}>
        {currentRoom ? (
          <>
            <h3>Chat: {currentRoom.familyName}</h3>
            <div style={{ height: 300, overflowY: "scroll", border: "1px solid #ccc", padding: 10 , marginLeft: 0}}>
              {messages.map((msg) => (
                <div className="" key={msg._id}> {msg.text} <br /> {msg.senderName} – {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                
                // <div key={msg._id}><strong>{msg.senderId}:</strong> {msg.text}</div>
              ))}
            </div>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
          </>
        ) : (
          <p>Select a room to chat</p>
        )}
      </div>
    </div>
  );
}
