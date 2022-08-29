const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const authDao = require("./authDao");

exports.emailCheck = async (email) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const emailCheckResult = await authDao.selectAdminEmail(connection, email);
    connection.release();
    return emailCheckResult[0];
  } catch (error) {
    handleError(error);
    connection.release();
  }
};

exports.passwordCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await authDao.selectAdminPassword(connection, email);
  connection.release();
  return passwordCheckResult[0];
};

exports.statusCheck = async (email) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAcountResult = await authDao.selectAdminAccount(connection, email);
  connection.release();
  return userAcountResult[0];
};

exports.statusCheckByIdx = async (adminIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAcountResult = await authDao.selectAdminAccountByIdx(connection, adminIdx);
  connection.release();
  return userAcountResult[0];
};
