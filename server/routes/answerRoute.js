const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { postAnswer, getAnswers } = require("../Controller/answerController");

router.post("/:questionid", authMiddleware, postAnswer);
router.get("/:questionid", getAnswers);

module.exports = router;
