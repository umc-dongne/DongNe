import baseResponseStatus from "../../../config/baseResponseStatus";

const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const accountProvider = require("./finAccountProvider");
const accountService = require("./finAccountService");
const regexDate = /\d{4}-\d{2}-\d{2}/;
/**
 * API No. 7.1
 * API Name : 회계 생성 api
 * [POST] admin/finAccount/
 */

export const createFinAccount = async (req, res) => {
  /*
    body: 
      - adminIdx
      - finAccountCategoryIdx
      - finAccountItem
      - isProfit : 0: 비용(negative), 1: 수입(profit)
      - finAccountCost
      - finAccountDate : DATE
      - etc : VARCHAR(200)
  */
  const { adminIdx, finAccountCategoryIdx, isProfit, finAccountItem, finAccountCost, finAccountDate, etc } = req.body;
  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  if (parseInt(adminIdx) !== JWT_Token_adminIdx) {
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }

  //todo: 모든 파라미터 (etc 제외) 다 있는 지 확인
  if (!adminIdx) return res.send(errResponse(baseResponseStatus.FINACCOUNT_ADMINIDX_EMPTY));
  if (!finAccountCategoryIdx) return res.send(errResponse(baseResponseStatus.FINACCOUNT_CATEGORY_EMPTY));
  if (!isProfit) return res.send(errResponse(baseResponseStatus.FINACCOUNT_ISPROFIT_EMPTY));
  if (!finAccountItem) return res.send(errResponse(baseResponseStatus.FINACCOUNT_ITEM_EMPTY));
  if (!finAccountCost) return res.send(errResponse(baseResponseStatus.FINACCOUNT_COST_EMPTY));
  if (!finAccountDate) return res.send(errResponse(baseResponseStatus.FINACCOUNT_DATE_EMPTY));

  //todo: isProfit 0과 1중 하나 맞는지 확인
  if (isProfit !== "0" && isProfit !== "1") return res.send(errResponse(baseResponseStatus.FINACCOUNT_ISPROFIT_WRONG));
  //todo: finAccountCost 숫자인지 확인
  if (isNaN(finAccountCost)) return res.send(errResponse(baseResponseStatus.FINACCOUNT_COST_NOT_NUMBER));

  //todo: finAccountDate 형식 yyyy-mm-dd 맞는 지 확인
  if (!regexDate.test(finAccountDate)) return res.send(errResponse(baseResponseStatus.FINACCOUNT_DATE_WRONG));
  //todo: finAccountItem 길이 확인
  if (finAccountItem.length >= 35) return res.send(errResponse(baseResponse.FINACCOUNT_ITEM_LENGTH_WRONG));

  //etc 길이 확인
  if (etc.length >= 180) return res.send(errResponse(baseResponse.FINACCOUNT_ETC_LENGTH_WRONG));
  const isProfitNum = parseInt(isProfit);
  const createFinAccountResult = await accountService.createFinAccount(adminIdx, finAccountCategoryIdx, isProfitNum, finAccountItem, finAccountCost, finAccountDate, etc);
  return res.send(createFinAccountResult);
};

/**
 * API No. 7.2
 * API Name : 회계 카테고리 생성 api
 * [POST] admin/finAccount/category
 */

export const createFinAccCategory = async (req, res) => {
  /*
    body: 
      - categoryName
      - adminIdx
  */
  const adminIdx = req.get("adminIdx");
  const { categoryName } = req.body;

  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  if (parseInt(adminIdx) !== JWT_Token_adminIdx) {
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }
  if (!adminIdx) return res.send(errResponse(baseResponseStatus.FINACCOUNT_ADMINIDX_EMPTY));
  if (!categoryName) return res.send(errResponse(baseResponseStatus.FINACCOUNT_CATEGORY_NAME_EMPTY));

  if (categoryName.length >= 35) return res.send(errResponse(baseResponse.FINACCOUNT_ITEM_LENGTH_WRONG));
  const createFinAccCategorytResult = await accountService.createFinAccCategory(categoryName, adminIdx);
  return res.send(createFinAccCategorytResult);
};

/**
 * API No. 7.3
 * API Name : 최근 4개 회계 조회 api
 * [GET] admin/finAccount/
 */

export const getFinAccount = async (req, res) => {
  const adminIdx = req.get("adminIdx");
  if (!adminIdx) return res.send(errResponse(baseResponse.FINACCOUNT_ADMINIDX_EMPTY));
  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  if (parseInt(adminIdx) !== JWT_Token_adminIdx) {
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }
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

  const year = req.query.year;
  const month = req.query.month;

  if (!adminIdx) return res.send(errResponse(baseResponse.FINACCOUNT_ADMINIDX_EMPTY));
  if (!year) return res.send(errResponse(baseResponse.FINACCOUNT_YEAR_EMPTY));
  if (!month) return res.send(errResponse(baseResponse.FINACCOUNT_MONTH_EMPTY));
  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  if (parseInt(adminIdx) !== JWT_Token_adminIdx) {
    console.log(adminIdx, JWT_Token_adminIdx);
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }

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
  const year = req.query.year;
  const month = req.query.month;
  const day = req.query.day;

  if (!adminIdx) return res.send(errResponse(baseResponse.FINACCOUNT_ADMINIDX_EMPTY));
  if (!year) return res.send(errResponse(baseResponse.FINACCOUNT_YEAR_EMPTY));
  if (!month) return res.send(errResponse(baseResponse.FINACCOUNT_MONTH_EMPTY));
  if (!day) return res.send(errResponse(baseResponse.FINACCOUNT_DAY_EMPTY));

  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  if (parseInt(adminIdx) !== JWT_Token_adminIdx) {
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }
  const adminIdxNum = Number(adminIdx);
  const getFinAccountResult = await accountProvider.getFinAccountByDay(adminIdxNum, year, month, day);
  return res.send(getFinAccountResult);
};

/**
 * API No. 7.5
 * API Name : 회계 카테고리 수정 api
 * [PATCH] admin/finAccount/category/{cid}
 */
export const patchCategory = async (req, res) => {
  /*
      path variable = cId
      header variable = adminIdx
      
      body:
        - categoryName
  */
  const adminIdx = req.get("adminIdx");
  const categroyIdx = req.params.cId;
  console.log(categroyIdx);
  const { categoryName } = req.body;
  if (!adminIdx) return res.send(errResponse(baseResponse.FINACCOUNT_ADMINIDX_EMPTY));
  if (!categroyIdx) return res.send(errResponse(baseResponse.FINACCOUNT_CATEGORYIDX_EMPTY));
  if (!categoryName) return res.send(errResponse(baseResponse.FINACCOUNT_CATEGORYNAME_EMPTY));
  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  if (parseInt(adminIdx) !== JWT_Token_adminIdx) {
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }
  const patchCategoryResult = await accountService.updateFinCategory(adminIdx, categroyIdx, categoryName);
  return res.send(patchCategoryResult);
};

/**
 * API No. 7.5
 * API Name : 회계 항목 수정 api
 * [PATCH] admin/finAccount/{fId}
 */
export const patchFinAccount = async (req, res) => {
  /*
      header variable = adminIdx
      
      body:
        - finAccountCategoryIdx
        - finAccountItem
        - isProfit : 0: 비용(negative), 1: 수입(profit)
        - finAccountCost
        - finAccountDate : DATE
        - etc : VARCHAR(200)
  */
  const { finAccountCategoryIdx, finAccountItem, isProfit, finAccountCost, finAccountDate, etc } = req.body;
  const adminIdx = req.get("adminIdx");
  const accountIdx = req.params.fId;
  console.log(accountIdx);
  //todo: 모든 파라미터 (etc 제외) 다 있는 지 확인
  if (!adminIdx) return res.send(errResponse(baseResponseStatus.FINACCOUNT_ADMINIDX_EMPTY));
  if (!finAccountCategoryIdx) return res.send(errResponse(baseResponseStatus.FINACCOUNT_CATEGORY_EMPTY));
  if (!isProfit) return res.send(errResponse(baseResponseStatus.FINACCOUNT_ISPROFIT_EMPTY));
  if (!finAccountItem) return res.send(errResponse(baseResponseStatus.FINACCOUNT_ITEM_EMPTY));
  if (!finAccountCost) return res.send(errResponse(baseResponseStatus.FINACCOUNT_COST_EMPTY));
  if (!finAccountDate) return res.send(errResponse(baseResponseStatus.FINACCOUNT_DATE_EMPTY));
  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  if (parseInt(adminIdx) !== JWT_Token_adminIdx) {
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }
  //todo: isProfit 0과 1중 하나 맞는지 확인
  if (isProfit !== "0" && isProfit !== "1") return res.send(errResponse(baseResponseStatus.FINACCOUNT_ISPROFIT_WRONG));
  //todo: finAccountCost 숫자인지 확인
  if (isNaN(finAccountCost)) return res.send(errResponse(baseResponseStatus.FINACCOUNT_COST_NOT_NUMBER));

  //todo: finAccountDate 형식 yyyy-mm-dd 맞는 지 확인
  if (!regexDate.test(finAccountDate)) return res.send(errResponse(baseResponseStatus.FINACCOUNT_DATE_WRONG));
  //todo: finAccountItem 길이 확인
  if (finAccountItem.length >= 35) return res.send(errResponse(baseResponse.FINACCOUNT_ITEM_LENGTH_WRONG));

  //etc 길이 확인
  if (etc.length >= 180) return res.send(errResponse(baseResponse.FINACCOUNT_ETC_LENGTH_WRONG));

  const isProfitNum = parseInt(isProfit);
  const patchFinAccountResult = await accountService.updateFinAccount(accountIdx, adminIdx, finAccountCategoryIdx, finAccountItem, isProfitNum, finAccountCost, finAccountDate, etc);
  return res.send(patchFinAccountResult);
};

export const deleteFinAccount = async (req, res) => {
  /*
      header variable = adminIdx
      
      body:
        - finAccountCategoryIdx
        - finAccountItem
        - isProfit : 0: 비용(negative), 1: 수입(profit)
        - finAccountCost
        - finAccountDate : DATE
        - etc : VARCHAR(200)
  */
  const adminIdx = req.get("adminIdx");
  const accountIdx = req.params.fId;
  //todo: 모든 파라미터 (etc 제외) 다 있는 지 확인
  if (!adminIdx) return res.send(errResponse(baseResponseStatus.FINACCOUNT_ADMINIDX_EMPTY));
  if (!accountIdx) return res.send(errResponse(baseResponseStatus.FINACCOUNT_ACCOUNTIDX_EMPTY));
  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  if (parseInt(adminIdx) !== JWT_Token_adminIdx) {
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }
  const patchFinAccountResult = await accountService.deleteFinAccount(accountIdx, adminIdx);
  return res.send(patchFinAccountResult);
};

export const getFinAccountByIdx = async (req, res) => {
  /*
      header variable = adminIdx
  */
  const adminIdx = req.get("adminIdx");
  const accountIdx = req.params.fId;
  //todo: 모든 파라미터 (etc 제외) 다 있는 지 확인
  if (!adminIdx) return res.send(errResponse(baseResponseStatus.FINACCOUNT_ADMINIDX_EMPTY));
  if (!accountIdx) return res.send(errResponse(baseResponseStatus.FINACCOUNT_ACCOUNTIDX_EMPTY));
  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  if (parseInt(adminIdx) !== JWT_Token_adminIdx) {
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }
  const patchFinAccountResult = await accountService.getFinAccountByIdx(accountIdx, adminIdx);
  return res.send(patchFinAccountResult);
};

//카테고리 조회
export const getFinAccountCategory = async (req, res) => {
  const adminIdx = req.get("adminIdx");

  if (!adminIdx) return res.send(errResponse(baseResponse.FINACCOUNT_ADMINIDX_EMPTY));
  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  if (parseInt(adminIdx) !== JWT_Token_adminIdx) {
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }
  const adminIdxNum = Number(adminIdx);
  const getFinAccountCategoryResult = await accountProvider.getCategory(adminIdxNum);
  return res.send(getFinAccountCategoryResult);
};

export const getFinAccountDates = async (req, res) => {
  const adminIdx = req.params.aId;
  if (!adminIdx) return res.send(errResponse(baseResponse.FINACCOUNT_ADMINIDX_EMPTY));
  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  if (parseInt(adminIdx) !== JWT_Token_adminIdx) {
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }
  const adminIdxNum = Number(adminIdx);
  const getFinAccountDatesResult = await accountProvider.getFinAccountDates(adminIdxNum);
  return res.send(getFinAccountDatesResult);
};

/**
 * API No. 7.12
 * API Name : 월별 회계 카테고리 조회 api
 * [GET] admin/finAccount/category/month
 */

export const getFACategoryMonthly = async (req, res) => {
  /*
    query string: 
      - year
      - month
  */
  const adminIdx = req.get("adminIdx");

  const year = req.query.year;
  const month = req.query.month;

  if (!adminIdx) return res.send(errResponse(baseResponse.FINACCOUNT_ADMINIDX_EMPTY));
  if (!year) return res.send(errResponse(baseResponse.FINACCOUNT_YEAR_EMPTY));
  if (!month) return res.send(errResponse(baseResponse.FINACCOUNT_MONTH_EMPTY));
  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  if (parseInt(adminIdx) !== JWT_Token_adminIdx) {
    console.log(adminIdx, JWT_Token_adminIdx);
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }

  const adminIdxNum = Number(adminIdx);
  const getFinAccountResult = await accountProvider.getFinAccountCategoryByMonth(adminIdxNum, year, month);
  return res.send(getFinAccountResult);
};
