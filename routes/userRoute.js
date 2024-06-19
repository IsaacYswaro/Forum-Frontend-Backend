const express =require("express");
const router = express.Router();

// Authtonthication middleware

const authMiddleware = require ("../middleware/authMiddleware")

// user controller

const {
  register,
  login,
  checkUser,
  getUserInfo,
} = require("../Controller/userController");


router.post("/register", register);
// login user
router.post("/login", login);

// check user
router.get("/check",authMiddleware, checkUser);
router.get("/me", authMiddleware, getUserInfo);

module.exports= router