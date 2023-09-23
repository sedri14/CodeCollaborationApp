import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

const CodeBlock = () => {
  const { id: roomId } = useParams();

  const joinRoom = (roomId) => {
    if (roomId !== "") {
      socket.emit("join_room", roomId);
    }
  };

  const leaveRoom = () => {
    if (roomId !== "") {
      socket.emit("leave_room", roomId);
    }
  };

  useEffect(() => {
    joinRoom(roomId); // Join the room when the component mounts
    return leaveRoom(); // Leave the room when the component unmounts
  }, [roomId]); // Rejoin the room when the room ID changes

  return (
    <>
      <h1>CodeBlock component Room: {roomId}</h1>
    </>
  );
};

export default CodeBlock;
