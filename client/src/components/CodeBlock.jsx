import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

const CodeBlock = () => {
  const { id: roomId } = useParams();
  const location = useLocation();
  const code = location.state.code;
  const [userCount, setUserCount] = useState(0);

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

  //todo: delete
  useEffect(() => {
    console.log(`%%%%%%%%%%${userCount}`);
  }, [userCount]);

  useEffect(() => {
    joinRoom(roomId); // Join the room when the component mounts

    // Listen for user count updates from the server
    socket.on("user_count", (count) => {
      setUserCount(count);
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
        <textarea
          value={code}
          disabled={false} //contidion: number of users in room == 1
        />
      </main>
    </>
  );
};

export default CodeBlock;
