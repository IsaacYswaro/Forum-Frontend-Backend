
const dbconnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

async function askQuestion(req, res) {
  const { title, description } = req.body;
  const userid = req.user.userid; 
const questionid = uuidv4(); 


  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    await dbconnection.query(
      "INSERT INTO questions (userid, title, description, questionid) VALUES (?,?,?,?)",
      [userid, title, description, questionid]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "Question submitted", questionid:questionid });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something Went Wrong" });
  }
}

async function getQuestions(req, res) {
  try {
    const [questions] = await dbconnection.query(
      "SELECT q.title, q.description, u.username, q.questionid FROM questions q JOIN users u ON q.userid = u.userid ORDER BY q.id DESC"
    );
    res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something Went Wrong" });
  }
}


async function detailQuestions(req, res) {
const {questionid} =req.params

  try {
    const [questionDetails] = await dbconnection.query(
      "SELECT q.title, q.description, u.username FROM questions q JOIN users u ON q.userid = u.userid where q.questionid=?", [questionid]
    );
    res.status(StatusCodes.OK).json(questionDetails);
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something Went Wrong" });
  }
}

module.exports = { askQuestion, getQuestions, detailQuestions };