
require("dotenv").config();
const mysql2 = require("mysql2");

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

module.exports = dbconnection.promise();
