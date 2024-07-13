
const dbconnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function postAnswer(req, res) {
  const { answer } = req.body;
  const userid = req.user.userid;
const {questionid} = req.params
  if (!questionid || !answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    await dbconnection.query(
      "INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)",
      [userid, questionid, answer]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "Answer submitted" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something Went Wrong" });
  }
}

async function getAnswers(req, res) {
  const { questionid } = req.params;

  try {
    const [answers] = await dbconnection.query(
      "SELECT a.answer, u.username FROM answers a JOIN users u ON a.userid = u.userid WHERE a.questionid = ?",
      [questionid]
    );
    res.status(StatusCodes.OK).json(answers);
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something Went Wrong" });
  }
}

module.exports = { postAnswer, getAnswers };
