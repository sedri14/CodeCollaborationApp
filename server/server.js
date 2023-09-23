const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const roomUserCounter = {};

io.on("connection", (socket) => {
    //console.log(`User connected: ${socket.id}`)

    socket.on("join_room", (roomId) => {
        socket.join(roomId)
        if (!roomUserCounter[roomId]) {
            roomUserCounter[roomId] =  1;
        } else {
            roomUserCounter[roomId]++;
        }

        // update client with user count
        io.to(roomId).emit("user_count", roomUserCounter[roomId]);

        console.log(`User ${socket.id} connected to room ${roomId}`)
        console.log(`Room: ${roomId}, No of users: ${roomUserCounter[roomId]}`)
    })

    socket.on("leave_room", (roomId) => {
        socket.leave(roomId);

        if (roomUserCounter[roomId]) {
            roomUserCounter[roomId]--;
        }

        // update client with user count
        io.to(roomId).emit("user_count", roomUserCounter[roomId]);

        console.log(`User ${socket.id} DISCONNECT from room ${roomId}`)
        console.log(`Room: ${roomId}, No of users: ${roomUserCounter[roomId]}`)
    })

})

server.listen(3001, () => {
  console.log("Server started on port 3001");
});
