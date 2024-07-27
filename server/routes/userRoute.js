const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  register,
  login,
  checkUser,
  getUserInfo,
} = require("../Controller/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/check", authMiddleware, checkUser);
router.get("/me", authMiddleware, getUserInfo);

module.exports = router;
