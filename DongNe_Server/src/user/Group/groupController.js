import { GROUP_GROUPINTRODUCTION_EMPTY } from "../../../config/baseResponseStatus";

const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const groupService = require("./groupService");
const groupProvider = require("./groupProvider");



/*
    API No. 0.0
    API Nanme: DB 테스트 API
    [GET] /group/db
*/
export const getDatabaseTest = async (req, res) => {
    const testUserResult = await groupProvider.retrieveUserList();
    return res.send(testUserResult);
  };

/*
    개발 노트 📝
    req Data's Validation : 형식적 Validation 처리 우선 ✅ // DB Validation 후 순위 ❌
    Validation (basic) : req Data's not null and length
    Validation (middle) : req Data's Status
    Validation은 Validation (basic)을 구성해 API를 만들고 작업 후 순위로 Validation (middle)을 구성
*/



/*
    API No. 5.1
    API Nanme: 그룹 리스트 조회
    [GET] /user/group?adminIdx=
*/
export const getGroupList = async (req, res) => {
  /*
      Query String: adminIdx
  */
  const adminIdx = req.query.adminIdx;
  const userIdx = req.query.userIdx;
  const JWT_token_userIdx = req.verifiedToken.adminId;

  // validation (basic) ✅
  if(!adminIdx) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } 
  if (adminIdx <= 0) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  if(!userIdx) {
      return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
  } 
  if (userIdx <= 0) {
      return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
  }

  if (userIdx != JWT_token_userIdx){
      return res.send(errResponse(baseResponse.JWT_USER_TOKEN_DIFFERENT));
  }

  

  // Validation (Middle) ❌ 
  /*
    + adminIdx's Status valid with GroupList Table ?
    + JWT Token's userIdx and req.adminIdx by ClubMembers Table is status "ACTIVE" ? (WHERE ID)
  */

  //paging ✅
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  if(!page || !pageSize){
      return res.send(errResponse(baseResponse.PAGING_PARAMS_EMPTY));
  }


  // JWT Token's userIdx filltering the not adminIdx's groupIdx by groupMembers Table (status = ACTIVE) ❌   
  // 그룹 리스트 조회
  const groupListResult = await groupService.retrievePagingGroupList(adminIdx, userIdx, page, pageSize);

  return res.send(response(baseResponse.SUCCESS, groupListResult));
};



    /*
        API No. 5.2
        API Nanme: 그룹 조회
        Part 1, Part 2
        [GET]
    */

/*
    API No. 5.2 - Part 1
    API Nanme: 그룹 이름, 내용조회
    [GET] /group/Info?groupIdx=
*/
export const getGroupInfo = async (req, res) => {
  /*
      Query String: groupidx
  */
  const groupIdx = req.query.groupIdx;
  const adminIdx = req.query.adminIdx;
  const userIdx = req.query.userIdx;
  const JWT_token_userIdx = req.verifiedToken.adminId;

  // validation (basic) ✅
  if(!groupIdx) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } 
  if (groupIdx <= 0) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }

  if(!adminIdx) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } 
  if (adminIdx <= 0) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  if(!userIdx) {
      return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
  } 
  if (userIdx <= 0) {
      return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
  }

  if (userIdx != JWT_token_userIdx){
      return res.send(errResponse(baseResponse.JWT_USER_TOKEN_DIFFERENT));
  }
  

  // Validation (Middle) ❌ 
  /*
    + groupIdx's Status valid with GroupList Table ?
    + JWT Token's groupIdx include req.groupIdx ?
  */

  // 그룹 이름, 내용 조회
  const groupInfoResult = await groupProvider.retrieveGroupInfo(groupIdx, adminIdx, userIdx);

  return res.send(response(baseResponse.SUCCESS, groupInfoResult));
};


/*
    API No. 5.2 - Part 2
    API Nanme: 그룹 소속회원 조회
    [GET] /group/members?groupIdx=
*/
export const getGroupMembers = async (req, res) => {
  /*
      Query String: groupIdx
  */
  const groupIdx = req.query.groupIdx;
  const adminIdx = req.query.adminIdx;
  const userIdx = req.query.userIdx;
  const JWT_token_userIdx = req.verifiedToken.adminId;

  // validation (basic) ✅
  if(!groupIdx) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } 
  if (groupIdx <= 0) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }

  if(!adminIdx) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } 
  if (adminIdx <= 0) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  if(!userIdx) {
      return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
  } 
  if (userIdx <= 0) {
      return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
  }

  if (userIdx != JWT_token_userIdx){
      return res.send(errResponse(baseResponse.JWT_USER_TOKEN_DIFFERENT));
  }


  // Validation (Middle) ❌ 
  /*
    + groupIdx's Status valid with GroupList Table ?
    + JWT Token's groupIdx include req.groupIdx ?
  */

  //paging
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  if(!page || !pageSize){
      return res.send(errResponse(baseResponse.PAGING_PARAMS_EMPTY));
  }


  // 그룹 소속회원 조회
  const groupMembersResult = await groupService.retrievePagingGroupMembers(groupIdx, adminIdx, userIdx, page, pageSize);

  return res.send(response(baseResponse.SUCCESS, groupMembersResult));
};