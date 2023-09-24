require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const server = http.createServer(app);

const origin = process.env.ORIGIN;
const port = process.env.PORT;

const io = new Server(server, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
  },
});
app.use(cors());
app.use(express.json());

//Setting up database
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const roomUserCounter = {};

//Route for handling HTTP requests
const codeblocksRouter = require("./routes/codeblocks");
app.use("/codeblocks", codeblocksRouter);

io.on("connection", (socket) => {
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    if (!roomUserCounter[roomId]) {
      roomUserCounter[roomId] = 0;
    }

    roomUserCounter[roomId]++;

    io.to(roomId).emit("user_count", roomUserCounter[roomId]);

    console.log(`User ${socket.id} connected to room ${roomId}`);
    console.log(`Room: ${roomId}, No of users: ${roomUserCounter[roomId]}`);
  });

  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);

    if (roomUserCounter[roomId]) {
      roomUserCounter[roomId]--;
    }

    io.to(roomId).emit("user_count", roomUserCounter[roomId]);

    console.log(`User ${socket.id} DISCONNECT from room ${roomId}`);
    console.log(`Room: ${roomId}, No of users: ${roomUserCounter[roomId]}`);
  });

  socket.on("code_change", (data) => {
    const { roomId, code } = data;

    //Broadcast code change
    io.to(roomId).emit("code_change", { code });
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
