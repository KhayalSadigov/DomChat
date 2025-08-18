const express = require("express");
const userController = require("../Controllers/user.controller");
const userMiddleware = require("../Middlewares/user.middleware");

const userRoute = express.Router();

userRoute.get("/users", userController.getAll);
userRoute.get("/users/:id", userController.getOne);
userRoute.get("/users/verify/:token", userController.verify);
userRoute.post("/users/register", userMiddleware.register, userController.register);
userRoute.delete("/users/:id", userController.delete);
userRoute.post("/users/login", userController.login);

module.exports = userRoute;