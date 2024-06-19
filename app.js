const express = require("express");
const cors = require("cors");
const dbconnection = require("./db/dbConfig");
const userRoutes = require("./routes/userRoute");
const questionRoutes = require("./routes/questionRoute");
const answerRoutes = require("./routes/answerRoute");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); 

// Register user routes
app.use("/api/users", userRoutes);

// Register question routes
app.use("/api/questions",authMiddleware, questionRoutes);

// Register answer routes with authentication
app.use("/api/answers", authMiddleware, answerRoutes);

async function start() {
  try {
    const result = await dbconnection.execute("select 'test' ");
    await app.listen(port);
    console.log("database connection established");
    console.log(`Server listening on port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}

start();
