require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./Config/db");
const htpp = require("http");
const { Server } = require("socket.io");

// Express app setup
const app = express();
const port = process.env.PORT;

// Body parser and cors middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import/Use routes
const userRoute = require("./Routes/user.route");
const messageRoute = require("./Routes/message.route");
const messageSocket = require("./Sockets/message.socket");
app.use(messageRoute);
app.use(userRoute);

// Socket.io setup
const server = htpp.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
messageSocket(io);

// Start server and sync database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database error:", err);
  });
