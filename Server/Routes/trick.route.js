const express = require("express");
const trickController = require("../Controllers/trick.controller");
const trickMiddleware = require("../Middlewares/trick.middleware");

const trickRoute = express.Router();
trickRoute.get("/api/tricks", trickController.getAll);
trickRoute.post(
  "/api/tricks",
  trickMiddleware.validateTrick,
  trickController.post
);
trickRoute.delete("/api/tricks/:id", trickController.delete);

trickRoute.patch("/api/tricks/:id", trickController.patch);

module.exports = trickRoute;
