const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const memberDao = require("./memberDao");
const memberProvider = require("./memberProvider");


// API NO. 4.1 - paging
exports.retrievePagingClubMemberList = async function (adminIdx, userIdx, page, pageSize){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌retrievePagingClubMemberList DB Error: ${error.message}`);

    try {
        // Validation Check's adminIdx Status
        const adminIdxStatus = await memberProvider.checkAdminIdxStatus(adminIdx, userIdx);
        if (adminIdxStatus[0]?.status != "ACTIVE"){
            return errResponse(baseResponseStatus.USER_ADMINIDX_STATUS);
        }

        let start = 0;
        // Paging Validation
        if (page <= 0){
            page = 1;
        } else {
            start = (page - 1) * pageSize;
        }
        const totalDataCountResult = await memberProvider.retrieveTotalDataCount(adminIdx);
        // req.page's valid with retrieveData ?
        /*
        const lastPage = Math.ceil(totalDataCountResult[0].totalDataCount/ pageSize);
        if (page > lastPage){
            return errResponse(baseResponseStatus.PAGING_PAGE_WRONG);
        }
        */

        // Paging 된 회원명단 리스트 조회
        const pagingRetrieveMemberListResult = await memberProvider.retrieveClubMemberList(adminIdx, start, pageSize);

        // 조회 전체 데이터 수 + Paging 된 회원명단 리스트 response 객체 병합
        const pagingRetrieveMemberListAddTotalDataCountResult = {totalDataCountResult, pagingRetrieveMemberListResult}
        return pagingRetrieveMemberListAddTotalDataCountResult;

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}

// 개인 회원의 마이페이지 수정 - API NO. 4.4
exports.editUserMypage = async function (userIdx, name, school, phoneNum, birth, address, introduction) {
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌retriebeClubMemberList DB Error: ${error.message}`);
  
    try {
      const editUserMypageParams = [name, school, phoneNum, birth, address, introduction, userIdx];
      const editUserMypageResult = await memberDao.updateUserMypageClub(connection, editUserMypageParams);
      connection.release();
      return editUserMypageResult;
  
    } catch (error) {
      handleError(error);
      connection.release();
      return errResponse(baseResponseStatus.DB_ERRORS);
    }
  };