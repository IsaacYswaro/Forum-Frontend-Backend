const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  askQuestion,
  getQuestions,
  detailQuestions,
} = require("../Controller/questionController");

router.post("/ask", authMiddleware, askQuestion);
router.get("/", getQuestions);
router.get("/:questionid", detailQuestions);

module.exports = router;
