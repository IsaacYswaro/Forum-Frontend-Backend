
const express = require("express");
const {
  askQuestion,
  getQuestions,
  detailQuestions,
} = require("../Controller/questionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/ask", authMiddleware, askQuestion);
router.get("/", getQuestions); 
router.get("/questions/:questionid", detailQuestions)


module.exports = router;
