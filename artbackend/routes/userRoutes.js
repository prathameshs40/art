const express = require("express");
const userRoutes = express.Router();

const userController = require("../controllers/userController");
userRoutes.get("/", userController.userMsg);

module.exports = userRoutes;
