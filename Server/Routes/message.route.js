const express = require("express");
const messageController = require("../Controllers/message.controller");
const messageMiddleware = require("../Middlewares/message.middleware");

const messageRoute = express.Router();

messageRoute.get(
  "/api/messages",
  messageMiddleware.validateToken,
  messageController.getAll
);
messageRoute.get(
  "/api/messages/:id",
  messageMiddleware.validateToken,
  messageController.getOne
);
messageRoute.post(
  "/api/messages/send",
  messageMiddleware.validateMessage,
  messageMiddleware.validateToken,
  messageController.send
);

module.exports = messageRoute;
