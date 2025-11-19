const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ room, username }) => {
    socket.join(room);
  });

  socket.on("mensaje", (data) => {
    const messageData = {
      user: data.user,
      text: data.text,
      time: new Date().toLocaleTimeString(),
    };

    // ENVIAR A LA SALA
    io.to(data.room).emit("mensaje", messageData);
  });
});

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
