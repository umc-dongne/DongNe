const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { pool } = require("../../../config/database");
const accountDao = require("./finAccountDao");
const accountProvider = require("./finAccountProvider");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
import authProvider from "../Auth/authProvider";
import "dotenv/config";
import { logger } from "../../../config/winston";

export const createFinAccount = async (adminIdx, finAccountCategoryIdx, isProfit, finAccountItem, finAccountCost, finAccountDate, etc) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const finAccountInfo = [adminIdx, finAccountCategoryIdx, isProfit, finAccountItem, finAccountCost, finAccountDate, etc];

    const userInfoRows = await authProvider.statusCheckByIdx(adminIdx);
    if (userInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }

    //todo: finAcountCategoryIdx 상태 확인
    const categoryInfoRows = await accountProvider.categoryStatusCheck(finAccountCategoryIdx);
    if (!categoryInfoRows[0]) {
      return errResponse(baseResponse.FINACCOUNT_CATEGORY_NOT_EXIST);
    }
    if (categoryInfoRows[0].adminIdx !== parseInt(adminIdx)) {
      return errResponse(baseResponse.FINACCOUNT_CATEGORY_NOT_IN_CLUB);
    }
    if (categoryInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (categoryInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.FINACCOUNT_CATEGORY_DELETED);
    }
    const createAccountResult = await accountDao.insertFinAccount(connection, finAccountInfo);
    return response(baseResponse.SUCCESS, createAccountResult[0].insertId);
  } catch (err) {
    logger.error(`Admin - createFinAccount Service error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

export const createFinAccCategory = async (categoryName, adminIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const finAccCategoryInfo = [categoryName, adminIdx];
    //todo: admin 상태 확인
    const userInfoRows = await authProvider.statusCheckByIdx(adminIdx);
    if (userInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }
    //todo: categoryName 중복 확인
    const categoryRows = await accountProvider.categoryDupCheck(adminIdx, categoryName);
    if (categoryRows.length !== 0) return errResponse(baseResponse.FINACCOUNT_CATEGORY_EXIST);
    const createAccCategoryResult = await accountDao.insertFinAccCategory(connection, finAccCategoryInfo);
    return response(baseResponse.SUCCESS, createAccCategoryResult[0].insertId);
  } catch (err) {
    logger.error(`Admin - createFinAccCategory Service error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

export const updateFinCategory = async (adminIdx, categroyIdx, categoryName) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const finAccCategoryInfo = [categoryName, categroyIdx];
    //todo: admin 상태 확인
    const userInfoRows = await authProvider.statusCheckByIdx(adminIdx);

    const categoryInfoRows = await accountProvider.categoryStatusCheck(categroyIdx);
    if (!categoryInfoRows[0]) {
      return errResponse(baseResponse.FINACCOUNT_CATEGORY_NOT_EXIST);
    }

    if (categoryInfoRows[0].adminIdx !== parseInt(adminIdx)) {
      return errResponse(baseResponse.FINACCOUNT_CATEGORY_NOT_IN_CLUB);
    }
    if (categoryInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (categoryInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.FINACCOUNT_CATEGORY_DELETED);
    }

    if (userInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }
    //todo: categoryName 중복 확인
    const categoryRows = await accountProvider.categoryDupCheck(adminIdx, categoryName);
    if (categoryRows.length !== 0 && categoryRows.finAccountCategoryIdx !== categroyIdx) {
      return errResponse(baseResponse.FINACCOUNT_CATEGORY_EXIST);
    }
    const updateAccCategoryResult = await accountDao.modifyFinAccCategory(connection, finAccCategoryInfo);
    return response(baseResponse.SUCCESS, updateAccCategoryResult[0].insertId);
  } catch (err) {
    logger.error(`Admin - updateFinCategory Service error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

export const updateFinAccount = async (accountIdx, adminIdx, finAccountCategoryIdx, finAccountItem, isProfit, finAccountCost, finAccountDate, etc) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const finAccountInfo = [finAccountCategoryIdx, finAccountItem, isProfit, finAccountCost, finAccountDate, etc, accountIdx];
    //todo: adminIdx 상태 확인
    const userInfoRows = await authProvider.statusCheckByIdx(adminIdx);
    if (userInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }
    const finAccountInfoRows = await accountProvider.accountStatusCheck(accountIdx);
    if (finAccountInfoRows.length === 0) return errResponse(baseResponse.FINACCOUNT_NOT_EXIST);
    if (finAccountInfoRows[0].adminIdx !== parseInt(adminIdx)) return errResponse(baseResponse.FINACCOUNT_NOT_IN_CLUB);
    if (finAccountInfoRows[0].status === "DELETED") return errResponse(baseResponse.FINACCOUNT_ALREADY_DELETED);

    //todo: 카테고리 idx 존재하는 지 확인
    const categoryInfoRows = await accountProvider.categoryStatusCheck(finAccountCategoryIdx);

    if (!categoryInfoRows[0]) {
      return errResponse(baseResponse.FINACCOUNT_CATEGORY_NOT_EXIST);
    }

    if (categoryInfoRows[0].adminIdx !== parseInt(adminIdx)) {
      return errResponse(baseResponse.FINACCOUNT_CATEGORY_NOT_IN_CLUB);
    }
    if (categoryInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (categoryInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.FINACCOUNT_CATEGORY_DELETED);
    }
    const updateFinAccountResult = await accountDao.modifyFinAccount(connection, finAccountInfo);
    return response(baseResponse.SUCCESS, updateFinAccountResult[0].insertId);
  } catch (err) {
    logger.error(`Admin - updateFinAccount Service error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

export const deleteFinAccount = async (accountIdx, adminIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const finAccountInfo = [accountIdx];
    //todo: adminIdx 상태 확인
    const userInfoRows = await authProvider.statusCheckByIdx(adminIdx);
    if (userInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }

    //todo: accountIdx 존재하는 지 확인
    const finAccountInfoRows = await accountProvider.accountStatusCheck(accountIdx);
    if (finAccountInfoRows.length === 0) return errResponse(baseResponse.FINACCOUNT_NOT_EXIST);
    if (finAccountInfoRows[0].adminIdx !== parseInt(adminIdx)) return errResponse(baseResponse.FINACCOUNT_NOT_IN_CLUB);
    if (finAccountInfoRows[0].status === "DELETED") return errResponse(baseResponse.FINACCOUNT_ALREADY_DELETED);

    const deleteFinAccountResult = await accountDao.deleteFinAccount(connection, finAccountInfo);
    return response(baseResponse.SUCCESS, deleteFinAccountResult[0].insertId);
  } catch (err) {
    logger.error(`Admin - deleteFinAccount Service error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

export const getFinAccountByIdx = async (accountIdx, adminIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const finAccountInfo = [accountIdx];
    //todo: adminIdx 상태 확인
    const userInfoRows = await authProvider.statusCheckByIdx(adminIdx);
    if (userInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }

    //todo: accountIdx 존재하는 지 확인
    const finAccountInfoRows = await accountProvider.accountStatusCheck(accountIdx);
    if (finAccountInfoRows.length === 0) return errResponse(baseResponse.FINACCOUNT_NOT_EXIST);
    if (finAccountInfoRows[0].adminIdx !== parseInt(adminIdx)) return errResponse(baseResponse.FINACCOUNT_NOT_IN_CLUB);
    if (finAccountInfoRows[0].status === "DELETED") return errResponse(baseResponse.FINACCOUNT_ALREADY_DELETED);

    const getFinAccountResult = await accountDao.getFinAccountByIdx(connection, finAccountInfo);
    return response(baseResponse.SUCCESS, getFinAccountResult[0]);
  } catch (err) {
    logger.error(`Admin - deleteFinAccount Service error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};
