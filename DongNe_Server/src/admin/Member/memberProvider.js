const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const memberDao = require("./memberDao");
const res = require("express/lib/response");

// DB Test
exports.retrieveUserList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌retrieveUserList DB Error: ${error.message}`);
  
    try {
      const testResult = await memberDao.selectUserPosts(connection);
      connection.release();
      return response(baseResponseStatus.SUCCESS, testResult);
    } catch (error) {
      handleError(error);
      connection.release();
      return errResponse(baseResponseStatus.DB_ERRORS);
    }
  };

// 단체 모든 회원명단 리스트 조회 - API NO. 3.1
exports.retrieveClubMemberList = async function (adminIdx, start, pageSize) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retriebeClubMemberList DB Error: ${error.message}`);


  try {
    const clubMembersPagingParams = [adminIdx, start, pageSize]
    const clubMembersResult = await memberDao.selectClub(connection, clubMembersPagingParams);
    connection.release();
    return clubMembersResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API NO. 3.1 - AdminIdx Status Check
exports.checkClubStatus = async function (adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌checkClubStatus DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const clubStatus = await memberDao.selectClubStatus(connection, adminIdx);
    connection.release();
    return clubStatus[0].status;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API NO. 3.1 - Paging's totalDataCount (3.1에서 조회하는 Data 갯수 조회)
exports.retrieveTotalDataCount = async function (adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveTotalDataCount DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const totalDataCountResult = await memberDao.selectTotalDataCount(connection, adminIdx);
    connection.release();
    return totalDataCountResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// 회원 상세 조회 - API NO. 3.2
exports.retrieveMemberInfo = async function (userIdx, JWT_Token_adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveMemberInfo DB Error: ${error.message}`);

  
  try {
    // Validation Check's member Status is ACTIVE? || User Table is ACTIVE?
    const membersStatusParams = [userIdx, JWT_Token_adminIdx];
    const membersStatus = await memberDao.selectMemberStatus(connection, membersStatusParams);
    if (membersStatus[0]?.status != "ACTIVE" || membersStatus[0].UserStatus != "ACTIVE"){
      return errResponse(baseResponseStatus.USER_USERIDX_STATUS);
    }

    const clubTeamList = await memberDao.selcetClubTeamList(connection, JWT_Token_adminIdx);

    const memberInfoParams = [userIdx, JWT_Token_adminIdx];
    const memberInfo = await memberDao.selectMemberInfo(connection, memberInfoParams);
    connection.release();

    // 팀/조 카테고리 리스트 + 회원 상세 조회 response 객체 병합
    const memberInfoAddClubTeamList = {memberInfo, clubTeamList};
    return memberInfoAddClubTeamList;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API NO. 3.2 - User Status Check
exports.checkUserStatus = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌checkUserStatus DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const userStatus = await memberDao.selectUserStatus(connection, userIdx);
    connection.release();
    return userStatus[0].status;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API NO. 3.2 - Token User with AdminIdx Status Check
exports.checkTokenUserStatus = async function (userIdx, JWT_Token_adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌checkUserStatus DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const TokenUserStatusParams = [userIdx, JWT_Token_adminIdx];
    const tokenUserStatus = await memberDao.selectTokenUserStatus(connection, TokenUserStatusParams);
    connection.release();
    return tokenUserStatus[0].status;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API NO. 3.5, API NO. 3.3 - Validation Check's member Status
exports.checkMemberStatus = async function (userIdx, adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌checkUserStatus DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const memberStatusParams = [userIdx, adminIdx];
    const memberStatusResult = await memberDao.selectMemberStatus(connection, memberStatusParams);
    connection.release();
    return memberStatusResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};


// API NO. 3.5 - Validation Check's clubTeamListIdx Status
exports.checkClubTeamListIdxStatus = async function (clubTeamListIdx, adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌checkUserStatus DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const clubTeamListIdxStatusParams = [clubTeamListIdx, adminIdx];
    const clubTeamListIdxStatusResult = await memberDao.selectClubTeamListIdxStatus(connection, clubTeamListIdxStatusParams);
    connection.release();
    return clubTeamListIdxStatusResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// 어드민의 동아리 메인 홈 정보 조회 - API NO. 3.7
exports.retrieveAdminMainhome = async function (adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retriebeClubMemberList DB Error: ${error.message}`);

  try {
    const adminMainpageParams = [adminIdx, adminIdx];
    const adminMainpage = await memberDao.selectAdminMainhome(connection, adminMainpageParams);
    connection.release();
    return adminMainpage;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// 어드민 동아리 마이페이지 정보 조회 - API NO. 3.8
exports.retrieveAdminMypageInfo = async function (adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retriebeClubMemberList DB Error: ${error.message}`);

  try {
    const adminCategoryList = await memberDao.selectAdminCategoryList(connection);

    const adminMypageInfo = await memberDao.selectAdminMypageInfo(connection, adminIdx);

    const adminMypageInfoAddAdminCategoryList = {adminMypageInfo, adminCategoryList}

    connection.release();
    return adminMypageInfoAddAdminCategoryList;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

