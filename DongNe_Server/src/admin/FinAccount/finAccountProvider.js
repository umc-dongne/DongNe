const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
import authProvider from "../Auth/authProvider";
const accountDao = require("./finAccountDao");

export const getRecentFinAccount = async (adminIdxNum) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const getRecentFinAccountResult = await accountDao.retrieveFinAccount(
      connection,
      adminIdxNum
    );
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
    const getMonthlyFinAccountResult =
      await accountDao.retrieveFinAccountByMonth(
        connection,
        adminIdxNum,
        year,
        month
      );
    connection.release();
    return response(baseResponse.SUCCESS, getMonthlyFinAccountResult[0]);
  } catch (err) {
    logger.error(`Admin - getFinAccountByMonth Provider error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

export const getFinAccountByDay = async (adminIdxNum, year, month, day) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const getDailyFinAccountResult = await accountDao.retrieveFinAccountByDay(
      connection,
      adminIdxNum,
      year,
      month,
      day
    );
    connection.release();
    return response(baseResponse.SUCCESS, getDailyFinAccountResult[0]);
  } catch (err) {
    logger.error(`Admin - getFinAccountByDay Provider error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

export const getCategory = async (adminIdxNum) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const getDailyFinAccountResult = await accountDao.retrieveCategory(
      connection,
      adminIdxNum
    );
    connection.release();
    return response(baseResponse.SUCCESS, getDailyFinAccountResult[0]);
  } catch (err) {
    logger.error(`Admin - getFinAccountByDay Provider error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

export const categoryStatusCheck = async (idx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const categoryResult = await accountDao.selectCategory(connection, idx);
  connection.release();
  return categoryResult[0];
};

export const categoryDupCheck = async (adminIdx, categoryName) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const categoryResult = await accountDao.selectCategoryByName(
    connection,
    adminIdx,
    categoryName
  );
  connection.release();
  console.log(categoryResult[0]);
  return categoryResult[0];
};

export const accountStatusCheck = async (accountIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAcountResult = await accountDao.selectAdminAccountByIdx(
    connection,
    accountIdx
  );
  connection.release();
  return userAcountResult[0];
};

export const getFinAccountDates = async (adminIdx) => {
  const userInfoRows = await authProvider.statusCheckByIdx(adminIdx);
  if (userInfoRows[0].status === "INACTIVE") {
    return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
  } else if (userInfoRows[0].status === "DELETED") {
    return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
  }
  const connection = await pool.getConnection(async (conn) => conn);
  const getFinAccountDatesResult = await accountDao.retrieveAccountDates(
    connection,
    adminIdx
  );
  connection.release();
  return getFinAccountDatesResult[0];
};

export const getFinAccountCategoryByMonth = async (
  adminIdxNum,
  year,
  month
) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    // const getMonthlyFinAccountResult = await accountDao.retrievePosMonth(
    //   connection,
    //   adminIdxNum,
    //   year,
    //   month
    // );
    const getMonthlyPosResult = await accountDao.retrievePosMonth(
      connection,
      adminIdxNum,
      year,
      month
    );

    const getMonthlyNegResult = await accountDao.retrieveNegMonth(
      connection,
      adminIdxNum,
      year,
      month
    );
    connection.release();

    const result = {
      pos: getMonthlyPosResult[0],
      neg: getMonthlyNegResult[0],
    };
    return response(baseResponse.SUCCESS, result);
  } catch (err) {
    logger.error(`Admin - getFinAccountByMonth Provider error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
