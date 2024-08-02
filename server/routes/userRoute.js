const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  register,
  login,
  checkUser,
  getUserInfo,
} = require("../Controller/userController");

// POST /api/users/register - Register a new user
router.post("/register", register);

// POST /api/users/login - Login a user
router.post("/login", login);

// GET /api/users/check - Check user (authenticated)
router.get("/check", authMiddleware, checkUser);

// GET /api/users/me - Get the logged-in user's info
router.get("/me", authMiddleware, getUserInfo);

module.exports = router;
