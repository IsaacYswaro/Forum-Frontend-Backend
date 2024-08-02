const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { postAnswer, getAnswers } = require("../Controller/answerController");

// POST /api/answers/:questionid - Add a new answer to a question
router.post("/:questionid", authMiddleware, postAnswer);

// GET /api/answers/:questionid - Get all answers for a question
router.get("/:questionid", getAnswers);

module.exports = router;
