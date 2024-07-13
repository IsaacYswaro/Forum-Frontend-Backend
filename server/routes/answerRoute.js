const express = require("express");
const { postAnswer, getAnswers } = require("../Controller/answerController");

const router = express.Router();

// Route to post an answer, protected by authMiddleware
router.post("/:questionid", postAnswer);

// Route to get answers for a specific question
router.get("/:questionid", getAnswers);

module.exports = router;