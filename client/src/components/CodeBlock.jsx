import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { SERVER_ADDRESS } from "../constants";
import io from "socket.io-client";
import axios from "axios";

const socket = io.connect(SERVER_ADDRESS);

const CodeBlock = () => {
  const { id: roomId } = useParams();
  const [title, setTitle] = useState("");
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

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("code_change", { roomId, code: newCode });

    //Update code in db
    axios
      .patch(SERVER_ADDRESS + `codeblocks/${roomId}`, { code: newCode })
      .then((response) => {})
      .catch((error) => {
        console.error("Error updating code:", error);
      });
  };

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await axios.get(
          SERVER_ADDRESS + `codeblocks/${roomId}`
        );
        setCode(response.data.code);
        setTitle(response.data.title);
      } catch (error) {
        console.error("Error fetching code:", error);
      }
    };

    joinRoom(roomId);
    fetchCode();

    //Listen for user count updates from the server
    socket.on("user_count", (count) => {
      setUserCount(count);
      if (!isMentor.current && count === 1) {
        isMentor.current = true;
      }
    });

    //Listen for code changes from other users
    socket.on("code_change", (data) => {
      setCode(data.code);
    });

    //Leave the room when the component unmounts
    return () => leaveRoom();
  }, [roomId]);

  return (
    <>
      <header>
        <h1>{title}</h1>
        <h5>User Count: {userCount}</h5>
      </header>
      <main>
        <textarea
          value={code}
          disabled={isMentor.current}
          onChange={(e) => handleCodeChange(e.target.value)}
        />
      </main>
    </>
  );
};

export default CodeBlock;
