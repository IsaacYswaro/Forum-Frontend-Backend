const express = require("express");
const cors = require("cors");
const mysql = require('mysql2/promise');
// import dotenv and configure it
require("dotenv").config();
const userRoutes = require("./routes/userRoute");
const questionRoutes = require("./routes/questionRoute");
const answerRoutes = require("./routes/answerRoute");
const authMiddleware = require("./middleware/authMiddleware");
const { re } = require("npm-install");

const app = express();
const port = process.env.PORT || 5000;
const dbconnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(cors()); // Use CORS middleware
app.use(express.json()); // Use JSON parser middleware

// Register user routes
app.use("/api/users", userRoutes);

// Register question routes
app.use("/api/questions", authMiddleware, questionRoutes);

// Register answer routes with authentication
app.use("/api/answers", authMiddleware, answerRoutes);

async function start() {
  try {
    // Check database connection
    const result = await dbconnection.execute("SELECT 'test' ");
    console.log("Database connection established", result);

    // Start the server
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
}

start();
