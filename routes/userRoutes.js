const express = require("express");
const userRouter = express.Router();
const UserControllers = require("../controllers/userControllers.js");

userRouter.post("/register", UserControllers.register);
userRouter.post("/login", UserControllers.login);

module.exports = userRouter;
