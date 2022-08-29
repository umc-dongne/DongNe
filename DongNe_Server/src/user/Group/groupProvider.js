const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const groupDao = require("./groupDao");

// 그룹 리스트 조회 - API 5.1
exports.retrieveGroupList = async function (adminIdx, userIdx, start, pageSize) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveGroupInfo DB Error: ${error.message}`);

  try {
    const groupListPagingParams = [adminIdx, userIdx, start, pageSize];
    const groupListResult = await groupDao.selectGroupList(connection, groupListPagingParams);
    connection.release();
    return groupListResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API 5.1 - Paging's totalDataCount (5.1에서 조회하는 Data 갯수 조회)
exports.retrieveTotalDataCount = async function (adminIdx, userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveTotalDataCount DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const totalDataCountParams = [adminIdx, userIdx];
    const totalDataCountResult = await groupDao.selectTotalDataCount(connection, totalDataCountParams);
    connection.release();
    return totalDataCountResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API NO. 5.1 - Validation Check's adminIdx Status
exports.checkAdminIdxStatus = async function (adminIdx, userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveTotalDataCount DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const adminIdxStatusParams = [adminIdx, userIdx];
    const adminIdxStatus = await groupDao.selectAdminIdxStatus(connection, adminIdxStatusParams);
    connection.release();
    return adminIdxStatus;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};


// 그룹 이름, 내용 조회 - API 5.2 -> Part 1
exports.retrieveGroupInfo = async function (groupIdx, adminIdx, userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌retrieveGroupInfo DB Error: ${error.message}`);
  
    try {
      // Validation Check's adminIdx Status (middle)
      const adminIdxStatusParams = [adminIdx, userIdx];
      const adminIdxStatus = await groupDao.selectAdminIdxStatus(connection, adminIdxStatusParams);
      if (adminIdxStatus[adminIdxStatus.length -1]?.status != "ACTIVE"){
        return errResponse(baseResponseStatus.USER_ADMINIDX_STATUS);
      }


      // Validation Check's User groupIdx Status (middle)
      const groupIdxStatusParams = [groupIdx, adminIdx, userIdx];
      const groupIdxStatus = await groupDao.selectGroupIdxStatus(connection, groupIdxStatusParams);
      if (groupIdxStatus[groupIdxStatus.length -1]?.GroupListStatus != "ACTIVE" || groupIdxStatus[groupIdxStatus.length -1]?.GroupMembersStatus != "ACTIVE"){
        return errResponse(baseResponseStatus.USER_GROUPIDX_STATUS);
      }


      //그룹 이름, 내용 조회
      const groupInfoResult = await groupDao.selectGroupInfo(connection, groupIdx);
      connection.release();
      return groupInfoResult;
  
    } catch (error) {
      handleError(error);
      connection.release();
      return errResponse(baseResponseStatus.DB_ERRORS);
    }
  };

// 그룹 소속회원 조회 - API 5.2 -> Part 2
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

// API 5.2 - Paging's totalDataCount (5.2에서 조회하는 Data 갯수 조회)
exports.retrieveGroupMembersTotalDataCount = async function (groupIdx, adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveTotalDataCount DB Error: ${error.message}`);

  //Try문 예외처리
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

// API NO. 5.2 -> Part 2 - Validation Check's groupIdx Status
exports.checkGroupIdxStatus = async function (groupIdx, adminIdx, userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveTotalDataCount DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const groupIdxStatusParams = [groupIdx, adminIdx, userIdx];
    const groupIdxStatus = await groupDao.selectGroupIdxStatus(connection, groupIdxStatusParams);
    connection.release();
    return groupIdxStatus;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};
