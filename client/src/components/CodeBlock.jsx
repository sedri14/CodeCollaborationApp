import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";

const socket = io.connect("http://localhost:3001");

const CodeBlock = () => {
  const { id: roomId } = useParams();
  const [code, setCode] = useState("");
  const [userCount, setUserCount] = useState(0);
  const isMentor = useRef(false);

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
    const fetchCode = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/codeblocks/${roomId}`
        );
        setCode(response.data.code);
      } catch (error) {
        console.error("Error fetching code:", error);
      }
    };

    joinRoom(roomId); // Join the room when the component mounts
    fetchCode(); // Fetch the code when the component mounts

    // Listen for user count updates from the server
    socket.on("user_count", (count) => {
      setUserCount(count);
      if (!isMentor.current && count === 1) {
        isMentor.current = true;
      }
    });

    return () => leaveRoom(); // Leave the room when the component unmounts
  }, [roomId]); // Rejoin the room when the room ID changes

  return (
    <>
      <header>
        <h1>CodeBlock component Room: {roomId}</h1>
        <h2>User Count: {userCount}</h2>
      </header>
      <main>
        <textarea value={code} disabled={isMentor.current} />
      </main>
    </>
  );
};

export default CodeBlock;
