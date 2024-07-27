require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");
const userRoutes = require("./routes/userRoute");
const questionRoutes = require("./routes/questionRoute");
const answerRoutes = require("./routes/answerRoute");

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // assuming the frontend is running on port 3000
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// MySQL Connection Pool
const dbconnection = mysql2.createPool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

dbconnection.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  if (connection) connection.release();
  console.log("DB connection successful");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

async function start() {
  try {
    const result = await dbconnection.execute("SELECT 'test' AS test");
    console.log("Database connection established", result);

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
}

start();
