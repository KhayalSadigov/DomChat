const messageSocket = (io) => {
    // Socket.io event handling
  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });

    // Room management
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    // Leaving room
    socket.on("leaveRoom", (room) => {
      socket.leave(room);
      console.log(`User left room: ${room}`);
    });

    // Room messaging
    socket.on("roomMessage", (data) => {
      io.to(data.room).emit("roomMessage", data);
    });
  });
};
module.exports = messageSocket;
