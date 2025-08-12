const express = require("express");
const userController = require("../Controllers/user.controller");
const userMiddleware = require("../Middlewares/user.middleware");

const userRoute = express.Router();

userRoute.get("/users", userController.getAll);
userRoute.get("/users/:id", userController.getOne);
userRoute.get("/users/verify/:token", userController.verify);
userRoute.post("/users/register", userMiddleware.body, userController.register);

module.exports = userRoute;