const mysql = require("mysql2/promise");
import "dotenv/config";
const { logger } = require("./winston");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE_DEV,
  timezone: "Asia/Seoul",
});

pool.on("connection", (connection) => {
  logger.info("DB: connection!");
});

pool.on("release", function (connection) {
  logger.info(`DB: Connection ${connection.threadId} released`);
});

module.exports = {
  pool: pool,
};
