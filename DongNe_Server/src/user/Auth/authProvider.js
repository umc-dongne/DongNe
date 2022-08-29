const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const authDao = require("./authDao");

exports.emailCheck = async (email) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await authDao.selectUserEmail(connection, email);
  connection.release();
  return emailCheckResult[0];
};

exports.passwordCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await authDao.selectUserPassword(connection, email);
  connection.release();
  return passwordCheckResult[0];
};

exports.statusCheck = async (email) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAcountResult = await authDao.selectUserAccount(connection, email);
  connection.release();
  return userAcountResult[0];
};
