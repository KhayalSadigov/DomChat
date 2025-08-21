const express = require("express");
const userController = require("../Controllers/user.controller");
const userMiddleware = require("../Middlewares/user.middleware");

const userRoute = express.Router();

userRoute.get("/api/users", userController.getAll);
userRoute.get("/api/users/:id", userController.getOne);
userRoute.get("/api/users/verify/:token", userController.verify);
userRoute.post(
  "/api/users/register",
  userMiddleware.register,
  userController.register
);
userRoute.delete("/api/users/:id", userController.delete);
userRoute.post("/api/users/login", userController.login);

module.exports = userRoute;
