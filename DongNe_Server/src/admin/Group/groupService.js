const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const groupProvider = require("./groupProvider");
const groupDao = require("./groupDao");


// 그룹 추가 / Group Create - API 4.1
exports.createGroup = async function(adminIdx, groupName, groupIntroduction, groupCategory, userIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌createGroup DB Error: ${error.message}`);


    try {
        // Validation Member Status || User Status (middle)
        var groupUserIdx;
        for (groupUserIdx of userIdx){
            const membersStatus = await groupProvider.checkMembersStatus(groupUserIdx, adminIdx);
            if (membersStatus[0]?.status != "ACTIVE" || membersStatus[0]?.UserStatus != "ACTIVE"){
                return errResponse(baseResponseStatus.USER_USERIDX_STATUS);
            }
        }

        // 그룹 생성
        const insertGroupParams = [adminIdx, groupName, groupIntroduction, groupCategory];
        // transcation Start
        await connection.beginTransaction();
        const groupResult = await groupDao.insertGroup(connection, insertGroupParams);
        await connection.commit()
        // Create Group's groupIdx
        const groupIdx = groupResult[0].insertId;

        // 그룹 멤버 추가
        var groupUserIdx;
        for (groupUserIdx of userIdx){
            const insertGroupMemberParams = [groupUserIdx, groupIdx];
            await connection.beginTransaction();
            const groupMembersResult = await groupDao.insertGroupMembers(connection, insertGroupMemberParams);
            await connection.commit();          
        }
        return response(baseResponseStatus.SUCCESS, {addedGroup: groupIdx});

    } catch (error) {
        await connection.rollback();
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}

/*
// 그룹 추가 / Group Members add - API 4.1
exports.createGroupMembers = async function(userIdx, createGroupResponse){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌createGroupMembers DB Error: ${error.message}`);


    try {
        // One UserIdx INSERT
        var groupUserIdx;
        // 그룹의 회원 추가
        for (groupUserIdx of userIdx){
            const insertGroupMemberParams = [groupUserIdx, createGroupResponse];
            await connection.beginTransaction();
            const groupMembersResult = await groupDao.insertGroupMembers(connection, insertGroupMemberParams);
            await connection.commit();          
        }

        return response(baseResponseStatus.SUCCESS, {addedGroup: createGroupResponse});
        
    } catch (error) {
        await connection.rollback();
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release();
    }
}
*/

// API 4.2 - Paging
exports.retrievePagingGroupList = async function (adminIdx, page, pageSize){
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
        const totalDataCountResult = await groupProvider.retrieveTotalDataCount(adminIdx);
        // req.page's valid with retrieveData ?
        /*
        const lastPage = Math.ceil(totalDataCountResult[0].totalDataCount/ pageSize);
        if (page > lastPage){
            return errResponse(baseResponseStatus.PAGING_PAGE_WRONG);
        }
        */

        // Paging 된 그룹 리스트 조회
        const pagingRetrieveGroupListResult = await groupProvider.retrieveGroupList(adminIdx, start, pageSize);

        // 조회 전체 데이터 수 + Paging 된 그룹 리스트 response 객체 병합
        const pagingRetrieveGroupListAddTotalDataCountResult = {totalDataCountResult, pagingRetrieveGroupListResult};
        return pagingRetrieveGroupListAddTotalDataCountResult;

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}

// API 4.3 - Paging
exports.retrievePagingGroupMembers = async function (groupIdx, adminIdx, page, pageSize){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌retrievePagingClubMemberList DB Error: ${error.message}`);

    try {
        // Validation Check's groupIdx Status (middle)
        const groupIdxStatus = await groupProvider.checkGroupIdxStatus(groupIdx, adminIdx);
        if (groupIdxStatus[0]?.status != "ACTIVE"){
            return errResponse(baseResponseStatus.ADMIN_GROUPIDX_STATUS);
        }


        let start = 0;
        // Paging Validation
        if (page <= 0){
            page = 1;
        } else {
            start = (page - 1) * pageSize;
        }
        const totalDataCountResult = await groupProvider.retrieveGroupMembersTotalDataCount(groupIdx, adminIdx);

        // req.page's valid with retrieveData ?
        /*
        const lastPage = Math.ceil(totalDataCountResult[0].totalDataCount/ pageSize);
        if (page > lastPage){
            return errResponse(baseResponseStatus.PAGING_PAGE_WRONG);
        }
        */

        // Paging 된 회원명단 리스트 조회
        const pagingRetrieveGroupMembersResult = await groupProvider.retrieveGroupMembers(groupIdx, start, pageSize);

        // 조회 전체 데이터 수 + Paging 된 회원명단 리스트 reponse 객체 병합
        const pagingRetrieveGroupMembersAddTotalDataCountResult = {totalDataCountResult, pagingRetrieveGroupMembersResult};
        return pagingRetrieveGroupMembersAddTotalDataCountResult;

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}



// 그룹 이름, 내용 수정 - API 4.4 -> Part 1
exports.editGroupInfo = async function (groupIdx, adminIdx , groupName, groupIntroduction, groupCategory){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌editGroupInfo DB Error: ${error.message}`);

    try {
        // Validation Check's groupIdx Status (middle)
        const groupIdxStatus = await groupProvider.checkGroupIdxStatus(groupIdx, adminIdx);
        if (groupIdxStatus[0]?.status != "ACTIVE"){
            return errResponse(baseResponseStatus.ADMIN_GROUPIDX_STATUS);
        }
        

        const editGroupInfoParams = [groupName, groupIntroduction, groupCategory, groupIdx];
        const editGroupInfoResult = await groupDao.editGroupInfo(connection, editGroupInfoParams);
        return response(baseResponseStatus.SUCCESS);

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}

// 그룹 소속회원 삭제 - API 4.4 -> Part 2
exports.editGroupMembers = async function (groupIdx, adminIdx, userIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌editGroupMembers DB Error: ${error.message}`);

    try {
        // Validation Check's groupIdx Status (middle)
        const groupIdxStatus = await groupProvider.checkGroupIdxStatus(groupIdx, adminIdx);
        if (groupIdxStatus[groupIdxStatus.length - 1]?.status != "ACTIVE"){
            return errResponse(baseResponseStatus.ADMIN_GROUPIDX_STATUS);
        }

        // Validation Check's deleteUserIdx Status (middle)
        var groupUserIdx;
        for (groupUserIdx of userIdx){
            const groupUserIdxStatus = await groupProvider.checkGroupUserIdxStatus(groupUserIdx, groupIdx, adminIdx);       
            if (groupUserIdxStatus[groupUserIdxStatus.length - 1]?.ClubUserIdxStatus != "ACTIVE" || groupUserIdxStatus[groupUserIdxStatus.length - 1]?.GroupUserIdxStatus != "ACTIVE" || groupUserIdxStatus[groupUserIdxStatus.length - 1]?.UserStatus != "ACTIVE"){
                return errResponse(baseResponseStatus.ADMIN_DELETE_GROUPUSERIDX_STATUS);
            }
        }
        
        // 그룹 소속회원 삭제
        for (groupUserIdx of userIdx){
            await connection.beginTransaction();
            const editGroupMembersParams = [groupIdx, groupUserIdx];
            const editGroupMembersResult = await groupDao.editGroupMembers(connection, editGroupMembersParams);
            await connection.commit();
        }

        return response(baseResponseStatus.SUCCESS);

    } catch (error) {
        await connection.rollback();
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}

// 그룹 소속회원 추가 - API 4.4 -> Part 3
exports.insertGroupMembers = async function (groupIdx, adminIdx, userIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌createGroupMembers DB Error: ${error.message}`);

    try {
        // Validation Check's groupIdx Status (middle)
        const groupIdxStatus = await groupProvider.checkGroupIdxStatus(groupIdx, adminIdx);
        if (groupIdxStatus[0]?.status != "ACTIVE"){
            return errResponse(baseResponseStatus.ADMIN_GROUPIDX_STATUS);
        }

        // Validation Check's insertUserIdx Status (middle)
        var groupUserIdx;
        for (groupUserIdx of userIdx){
            const groupUserIdxStatus = await groupProvider.checkInsertGroupUserIdxStatus1(groupUserIdx, adminIdx);
            if (groupUserIdxStatus[groupUserIdxStatus.length - 1]?.ClubUserIdxStatus != "ACTIVE" || groupUserIdxStatus[groupUserIdxStatus.length - 1]?.UserStatus != "ACTIVE"){
                return errResponse(baseResponseStatus.ADMIN_INSERT_GROUPUSERIDX_STATUS);
            }

            const groupUserIdxStatus2 = await groupProvider.checkInsertGroupUserIdxStatus2(groupUserIdx, groupIdx);
            if (groupUserIdxStatus2[groupUserIdxStatus2.length - 1]?.GroupUserIdxStatus == "ACTIVE"){
                return errResponse(baseResponseStatus.ADMIN_INSERT_GROUPUSERIDX_STATUS);
            }
        }

        // 그룹 소속회원 추가
        for (groupUserIdx of userIdx){
            await connection.beginTransaction();
            const insertGroupMembersParams = [groupUserIdx, groupIdx];
            const GroupMembersResult = await groupDao.insertGroupMembers(connection, insertGroupMembersParams);
            await connection.commit();
        }

        return response(baseResponseStatus.SUCCESS);

    } catch (error) {
        await connection.rollback();
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}


// 그룹 삭제 - API NO. 4.5
exports.deleteGroup = async function (groupIdx, adminIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌deleteGroup DB Error: ${error.message}`);

    try {
        // Validation Check's groupIdx Status (middle)
        const groupIdxStatus = await groupProvider.checkGroupIdxStatus(groupIdx, adminIdx);
        if (groupIdxStatus[groupIdxStatus.length -1]?.status != "ACTIVE"){
            return errResponse(baseResponseStatus.ADMIN_GROUPIDX_STATUS);
        }

        // 그룹 삭제
        const GroupResult = await groupDao.editGroup(connection, groupIdx);
        return response(baseResponseStatus.SUCCESS);

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}
