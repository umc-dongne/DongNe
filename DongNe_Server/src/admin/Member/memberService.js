const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const memberDao = require("./memberDao");
const memberProvider = require("./memberProvider");
const res = require("express/lib/response");


// API NO. 3.1 - Paging's retrievePagingClubMemberList
exports.retrievePagingClubMemberList = async function (adminIdx, page, pageSize){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌retrievePagingClubMemberList DB Error: ${error.message}`);

    try {
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



// 회원 삭제 - API NO. 3.3
exports.deleteMember = async function (userIdx, adminIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌deleteGroup DB Error: ${error.message}`);

    try {
        // Validation Check's member Status is ACTIVE? || User Table is ACTIVE? (middle)
        const memberStatus = await memberProvider.checkMemberStatus(userIdx, adminIdx);
        if (memberStatus[0]?.status != "ACTIVE" || memberStatus[0]?.UserStatus != "ACTIVE"){
          return errResponse(baseResponseStatus.USER_USERIDX_STATUS);
        }

        const editMemberParams = [userIdx, adminIdx];
        const editMemberResult = await memberDao.editMember(connection, editMemberParams);
        return response(baseResponseStatus.SUCCESS);

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}

// 동아리의 회원 팀/조 카테고리 추가 - API NO. 3.4
exports.createClubTeam = async function (adminIdx, teamName){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌deleteGroup DB Error: ${error.message}`);

    try {
        const createClubTeamParams = [adminIdx, teamName];
        const createClubTeamResult = await memberDao.createClubTeam(connection, createClubTeamParams);
        return response(baseResponseStatus.SUCCESS);

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}

// 동아리 소속회원 팀/조 카테고리 적용 - API NO. 3.5
exports.updateMemberClubTeam = async function (clubTeamListIdx, userIdx, adminIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌deleteGroup DB Error: ${error.message}`);

    try {
        //Validation (middle)
        const checkMemberStatusResult = await memberProvider.checkMemberStatus(userIdx, adminIdx);
        if (checkMemberStatusResult[0]?.status != "ACTIVE" || checkMemberStatusResult[0]?.UserStatus != "ACTIVE"){
            return errResponse(baseResponseStatus.USER_USERIDX_STATUS);
        }

        const checkClubTeamListIdxStatusResult = await memberProvider.checkClubTeamListIdxStatus(clubTeamListIdx, adminIdx);
        if (checkClubTeamListIdxStatusResult[0]?.status != "ACTIVE"){
            return errResponse(baseResponseStatus.ADMIN_CLUBTEAMLISTIDX_STATUS);
        }

        //Validation Check's User Stauts
        /*
        프엔 휴먼에러를 막기위해선 필요함. -> memberStatus와 합치면 괜찮을 듯.
        */

        // 팀/조 카테고리 적용
        const updateMemberClubTeamParams = [clubTeamListIdx, userIdx, adminIdx];
        const updateMemberClubTeamResult = await memberDao.updateMemberClubTeam(connection, updateMemberClubTeamParams);
        return response(baseResponseStatus.SUCCESS);

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}

// 동아리 마이페이지 수정 - API NO. 3.6
exports.editClubMypage = async function (adminIdx, clubName, establishmentYear, clubRegion, clubWebLink, clubIntroduction, clubCategoryIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌deleteGroup DB Error: ${error.message}`);

    try {
        const editClubMypageParams = [clubName, establishmentYear, clubRegion, clubWebLink, clubIntroduction, clubCategoryIdx, adminIdx];
        const editClubMypageResult = await memberDao.updateClubMypage(connection, editClubMypageParams);
        return response(baseResponseStatus.SUCCESS);

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}