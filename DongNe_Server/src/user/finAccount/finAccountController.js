import baseResponseStatus from "../../../config/baseResponseStatus";

const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const accountProvider = require("./finAccountProvider");
const accountService = require("./finAccountService");
const regexDate = /\d{4}-\d{2}-\d{2}/;

/**
 * API No. 7.3
 * API Name : 최근 4개 회계 조회 api
 * [GET] admin/finAccount/
 */

export const getFinAccount = async (req, res) => {
  const adminIdx = req.get("adminIdx");
  const userIdx = req.get("userIdx");
  const JWT_Token_USERIDX = req.verifiedToken.adminId;
  if (parseInt(userIdx) !== JWT_Token_USERIDX) {
    console.log(userIdx, JWT_Token_USERIDX);
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }
  if (!adminIdx) return res.send(errResponse(baseResponse.FINACCOUNT_ADMINIDX_EMPTY));
  if (!userIdx) return res.send(errResponse(baseResponse.FINACCOUNT_USERIDX_EMPTY));
  const adminIdxNum = Number(adminIdx);
  const getFinAccountResult = await accountProvider.getRecentFinAccount(adminIdxNum);
  return res.send(getFinAccountResult);
};

/**
 * API No. 7.4
 * API Name : 월별 회계 조회 api
 * [GET] admin/finAccount/month
 */

export const getFinAccountMonthly = async (req, res) => {
  /*
    query string: 
      - year
      - month
  */
  const adminIdx = req.get("adminIdx");
  const userIdx = req.get("userIdx");
  const year = req.query.year;
  const month = req.query.month;
  const JWT_Token_USERIDX = req.verifiedToken.adminId;
  if (parseInt(userIdx) !== JWT_Token_USERIDX) {
    console.log(userIdx, JWT_Token_USERIDX);
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }
  if (!adminIdx) return res.send(errResponse(baseResponse.FINACCOUNT_ADMINIDX_EMPTY));
  if (!year) return res.send(errResponse(baseResponse.FINACCOUNT_YEAR_EMPTY));
  if (!month) return res.send(errResponse(baseResponse.FINACCOUNT_MONTH_EMPTY));
  if (!userIdx) return res.send(errResponse(baseResponse.FINACCOUNT_USERIDX_EMPTY));

  const adminIdxNum = Number(adminIdx);
  const getFinAccountResult = await accountProvider.getFinAccountByMonth(adminIdxNum, year, month);
  return res.send(getFinAccountResult);
};

/**
 * API No. 7.5
 * API Name : 일별 회계 조회 api
 * [GET] admin/finAccount/day
 */
export const getFinAccountDaily = async (req, res) => {
  /*
    query string: 
      - year
      - month
      - day
  */
  const adminIdx = req.get("adminIdx");
  const userIdx = req.get("userIdx");
  const year = req.query.year;
  const month = req.query.month;
  const day = req.query.day;
  const JWT_Token_USERIDX = req.verifiedToken.adminId;
  if (parseInt(userIdx) !== JWT_Token_USERIDX) {
    console.log(userIdx, JWT_Token_USERIDX);
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }
  if (!adminIdx) return res.send(errResponse(baseResponse.FINACCOUNT_ADMINIDX_EMPTY));
  if (!year) return res.send(errResponse(baseResponse.FINACCOUNT_YEAR_EMPTY));
  if (!month) return res.send(errResponse(baseResponse.FINACCOUNT_MONTH_EMPTY));
  if (!day) return res.send(errResponse(baseResponse.FINACCOUNT_DAY_EMPTY));
  if (!userIdx) return res.send(errResponse(baseResponse.FINACCOUNT_USERIDX_EMPTY));

  const adminIdxNum = Number(adminIdx);
  const getFinAccountResult = await accountProvider.getFinAccountByDay(adminIdxNum, year, month, day);
  return res.send(getFinAccountResult);
};
export const getFinAccountDates = async (req, res) => {
  const adminIdx = req.params.aId;
  const userIdx = req.get("userIdx");
  if (!adminIdx) return res.send(errResponse(baseResponse.FINACCOUNT_ADMINIDX_EMPTY));
  if (!userIdx) return res.send(errResponse(baseResponse.FINACCOUNT_USERIDX_EMPTY));

  const JWT_Token_USERIDX = req.verifiedToken.adminId;
  if (parseInt(userIdx) !== JWT_Token_USERIDX) {
    console.log(userIdx, JWT_Token_USERIDX);
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }
  const adminIdxNum = Number(adminIdx);
  const getFinAccountDatesResult = await accountProvider.getFinAccountDates(adminIdxNum);
  return res.send(getFinAccountDatesResult);
};
