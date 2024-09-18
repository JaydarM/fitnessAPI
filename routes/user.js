const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

// Route for registration
router.post("/register", userController.registerUser);

// Route for login
router.post("/login", userController.loginUser);

module.exports = router;