import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

const port = process.env.PORT || 3000;

// Create raw HTTP server to attach both Express and socket.io
const server = http.createServer(app);

// Attach socket.io
const io = new Server(server, {
  path: "/api/socketio", // Optional, if you want to namespace it
  cors: {
    origin: ["http://localhost:3000", "https://chessui.vercel.app", "https://chessui.vercel.app/"],
    credentials: true,
  }
});

// Socket.IO logic (copy your original logic)
let room = {};

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    if (room?.id) {
      if (room?.id === roomId) {
        socket.join(roomId);
        io.in(roomId).emit("player_joined", {
          message: "Player 2 joined",
          player1: room.player1,
          player2: room.player2,
          waiting: false
        });
        room = {};
      } else {
        socket.emit("error", "Invalid Room Id, Room does not exist");
      }
    } else {
      const player1 = Math.round(Math.random()) ? "black" : "white";
      const player2 = player1 === "white" ? "black" : "white";
      room = {
        id: roomId,
        player1,
        player2
      };
      socket.join(roomId);
      socket.emit("player_joined", {
        message: "Player 1 joined",
        player1: room.player1,
        player2: room.player2,
        waiting: true
      });
    }
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on("move", ({ roomId, move }) => {
    console.log("move received:", move);
    socket.to(roomId).emit("opponentMove", move);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// Connect DB and start the server
connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log("🟢 Server + WebSocket running on port", port);
    });
  })
  .catch((err) => {
    console.log("🛑 Mongo DB connection failed", err);
  });
