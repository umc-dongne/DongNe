const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
import authProvider from "../../admin/Auth/authProvider";
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const accountDao = require("./finAccountDao");

export const getRecentFinAccount = async (adminIdxNum) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const getRecentFinAccountResult = await accountDao.retrieveFinAccount(connection, adminIdxNum);
    return response(baseResponse.SUCCESS, getRecentFinAccountResult[0]);
  } catch (error) {
    logger.error(`Admin - getRecentFinAccount Provider error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

export const getFinAccountByMonth = async (adminIdxNum, year, month) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const getMonthlyFinAccountResult = await accountDao.retrieveFinAccountByMonth(connection, adminIdxNum, year, month);
    return response(baseResponse.SUCCESS, getMonthlyFinAccountResult[0]);
  } catch (err) {
    logger.error(`Admin - getFinAccountByMonth Provider error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

export const getFinAccountByDay = async (adminIdxNum, year, month, day) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const getDailyFinAccountResult = await accountDao.retrieveFinAccountByDay(connection, adminIdxNum, year, month, day);
    connection.release();
    return response(baseResponse.SUCCESS, getDailyFinAccountResult[0]);
  } catch (err) {
    logger.error(`Admin - getFinAccountByDay Provider error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

export const getFinAccountDates = async (adminIdx) => {
  const userInfoRows = await authProvider.statusCheckByIdx(adminIdx);
  if (userInfoRows[0].status === "INACTIVE") {
    return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
  } else if (userInfoRows[0].status === "DELETED") {
    return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
  }
  const connection = await pool.getConnection(async (conn) => conn);
  const getFinAccountDatesResult = await accountDao.retrieveAccountDates(connection, adminIdx);
  connection.release();
  return getFinAccountDatesResult[0];
};
