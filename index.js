const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});

const PORT = process.env.PORT || 8080;

io.on("connection", (socket) => {
    console.log("New client connected", socket.id);
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });
    socket.on("leaveRoom", (roomId) => {
        socket.leave(roomId);
        console.log(`User ${socket.id} left room ${roomId}`);
    });
    socket.on("send_notification", (userId) => {
        // Emit notification to the specific user
        console.log(userId);

        io.to(userId).emit("notification", "Ваша очередь подошла!");
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
