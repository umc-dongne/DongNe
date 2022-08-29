const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const groupDao = require("./groupDao");


// API NO. 4.1 Validation Check's members Status
exports.checkMembersStatus = async function (userIdx, adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌checkUserStatus DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const membersStatusParams = [userIdx, adminIdx];
    const membersStatusResult = await groupDao.selectMembersStatus(connection, membersStatusParams);
    connection.release();
    return membersStatusResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// 그룹 리스트 조회 - API 4.2
exports.retrieveGroupList = async function (adminIdx, start, pageSize) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveGroupInfo DB Error: ${error.message}`);

  try {
    const groupListPagingParams = [adminIdx, start, pageSize];
    const groupListResult = await groupDao.selectGroupList(connection, groupListPagingParams);
    connection.release();
    return groupListResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API 4.2 - Paging's totalDataCount (4.2에서 조회하는 Data 갯수 조회)
exports.retrieveTotalDataCount = async function (adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveTotalDataCount DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const totalDataCountResult = await groupDao.selectTotalDataCount(connection, adminIdx);
    connection.release();
    return totalDataCountResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};


// 그룹 이름, 내용 조회 - API 4.3 -> Part 1
exports.retrieveGroupInfo = async function (groupIdx, adminIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌retrieveGroupInfo DB Error: ${error.message}`);
  

    try {
      // Validation Check's groupIdx Status
      const groupIdxStatusParams = [groupIdx, adminIdx];
      const groupIdxStatus = await groupDao.selectGroupIdxStatus(connection, groupIdxStatusParams);
      if (groupIdxStatus[0]?.status != "ACTIVE"){
        return errResponse(baseResponseStatus.ADMIN_GROUPIDX_STATUS);
      }

      // 그룹 이름, 내용 조회
      const groupInfoResult = await groupDao.selectGroupInfo(connection, groupIdx);
      connection.release();
      return groupInfoResult;
  
    } catch (error) {
      handleError(error);
      connection.release();
      return errResponse(baseResponseStatus.DB_ERRORS);
    }
  };

// 그룹 소속회원 조회 - API 4.3 -> Part 2
exports.retrieveGroupMembers = async function (groupIdx, start, pageSize) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveGroupMembers DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const adminIdx = await groupDao.selectAdminIdx(connection, groupIdx);
    const groupMembersPagingParams = [groupIdx, adminIdx[0].adminIdx, start, pageSize];
    const groupMembersResult = await groupDao.selectGroupMembers(connection, groupMembersPagingParams);
    connection.release();
    return groupMembersResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
  
};


// API NO. 4.3 -> Part 2 Validation Check's groupIdx Status
exports.checkGroupIdxStatus = async function (groupIdx, adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌checkUserStatus DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const groupIdxStatusParams = [groupIdx, adminIdx];
    const groupIdxStatusResult = await groupDao.selectGroupIdxStatus(connection, groupIdxStatusParams);
    connection.release();
    return groupIdxStatusResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};


// API 4.3 - Paging's totalDataCount (4.3에서 조회하는 Data 갯수 조회)
exports.retrieveGroupMembersTotalDataCount = async function (groupIdx, adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveTotalDataCount DB Error: ${error.message}`);

  try {
    const totalDataCountParams = [groupIdx, adminIdx];
    const totalDataCountResult = await groupDao.selectGroupMembersTotalDataCount(connection, totalDataCountParams);
    connection.release();
    return totalDataCountResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};


// API NO. 4.4 -> Part 2 - Validation Check's groupUserIdx Status
exports.checkGroupUserIdxStatus = async function (groupUserIdx, groupIdx, adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌checkUserStatus DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const groupUserIdxStatusParams = [groupUserIdx, groupIdx, adminIdx];
    const groupUserIdxStatusResult = await groupDao.selectGroupUserIdxStatus(connection, groupUserIdxStatusParams);
    connection.release();
    return groupUserIdxStatusResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API NO. 4.4 -> Part 3 - Validation Check's InsertGroupUserIdx Status_1
exports.checkInsertGroupUserIdxStatus1 = async function (groupUserIdx, adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌checkUserStatus DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const groupUserIdxStatus1Params = [groupUserIdx, adminIdx];
    const groupUserIdxStatus1Result = await groupDao.selectInsertGroupUserIdxStatus1(connection, groupUserIdxStatus1Params);
    connection.release();
    return groupUserIdxStatus1Result;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API NO. 4.4 -> Part 3 - Validation Check's InsertGroupUserIdx Status_2
exports.checkInsertGroupUserIdxStatus2 = async function (groupUserIdx, groupIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌checkUserStatus DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const groupUserIdxStatus2Params = [groupUserIdx, parseInt(groupIdx)];
    const groupUserIdxStatus2Result = await groupDao.selectInsertGroupUserIdxStatus2(connection, groupUserIdxStatus2Params);
    connection.release();
    return groupUserIdxStatus2Result;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};