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
    API No. 4.1
    API Nanme: 그룹 추가
    [POST] /group
*/
export const postGroup = async (req, res) => {
    /*
        Body : adminIdx, groupName, groupIntroduction, userIdx
    */
  const {adminIdx, groupName, groupIntroduction, groupCategory, userIdx} = req.body;
  const JWT_Token_adminIdx = req.verifiedToken.adminId;

  // Group Create's Body Data Validation (basic) ✅
  if (!adminIdx){
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0 ){
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  if (!groupName){
    return res.send(errResponse(baseResponse.GROUP_GROUPNAME_EMPTY));
  } else if (groupName.length > 45){
    return res.send(errResponse(baseResponse.GROUP_GROUPNAME_LENGTH));
  }

  if (!groupIntroduction){
    return res.send(errResponse(baseResponse.GROUP_GROUPINTRODUCTION_EMPTY));
  } else if (groupIntroduction.length > 200){
    return res.send(errResponse(baseResponse.GROUP_GROUPINTRODUCTION_LENGTH));
  }

  if (!groupCategory){
    return res.send(errResponse(baseResponse.GROUP_GROUPCATEGORY_EMPTY));
  } else if (groupCategory.length > 30){
    return res.send(errResponse(baseResponse.GROUP_GROUPCATEGORY_LENGTH));
  }

  // Group Create's Body Data Validation (middle) ✅
  /*
    JWT's Token's adminIdx include req.adminIdx?
      - Token's adminIdx valid with AdminTable ? - auth에서 이미 검증함.
      - Token's adminIdx same req.adminIdx ?
  */
  if (adminIdx != JWT_Token_adminIdx){
    return res.send(errResponse(baseResponse.JWT_GROUP_DIFFERENT))
  }

  // Group Members add's Body Data Validation (basic) ✅
  var groupUserIdx;
  for (groupUserIdx of userIdx){
    if(!groupUserIdx){
      return res.send(errResponse(baseResponse.GROUP_USERIDX_EMPTY));
    } else if (groupUserIdx <= 0){
      return res.send(errResponse(baseResponse.GROUP_USERIDX_LENGTH));
    }

    // Group Members add's Body Data Validation (middle) ❌
    /*
      groupUserIdx's Status valid with User Table ? - 프론트진에서 필요한 지 생각 후 Validation
      JWT Token's adminIdx include req.groupUserIdx ? - 프론트진에서 필요한 지 생각 후 Validation
      groupUserIdx's Status NULL or DELETED with GroupMembers Table ? - 프론트진에서 필요한 지 생각 후 Validation
    */

  }

  // Group Create ➕ Transcation 적용완료
  // createGroupResponse = groupIdx
  const createGroupResponse = await groupService.createGroup(
    adminIdx,
    groupName,
    groupIntroduction,
    groupCategory,
    userIdx
 );

  /*
  // Group Members add ➕ Transcation 적용완료
  const createGroupMembersResponse = await groupService.createGroupMembers(userIdx, createGroupResponse);
  */

  return res.send(createGroupResponse);

};




/*
    API No. 4.2
    API Nanme: 그룹 리스트 조회
    [GET] /group?adminIdx=&page=&pageSize=
*/
export const getGroupList = async (req, res) => {
  /*
      Query String: adminIdx, page, pageSize
  */
  const adminIdx = req.query.adminIdx;
  const JWT_Token_adminIdx = req.verifiedToken.adminId;

  // validation (basic) ✅
  if(!adminIdx) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } 
  if (adminIdx <= 0) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  // Validation (Middle) ✅
  /*
    + adminIdx's Status valid with GroupList Table ? - Dao에서 status = "ACTIVE" 분류 조회함. (필요성이 없음)
    + Token's adminIdx same req.adminIdx ?
  */
  if(adminIdx != JWT_Token_adminIdx){
      return res.send(errResponse(baseResponse.JWT_GROUPLIST_DIFFERENT));
  }

  //paging ✅
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  if(!page || !pageSize){
      return res.send(errResponse(baseResponse.PAGING_PARAMS_EMPTY));
  }

 
  // 그룹 리스트 조회
  const groupListResult = await groupService.retrievePagingGroupList(adminIdx, page, pageSize);

  return res.send(response(baseResponse.SUCCESS, groupListResult));
};


    /*
        API No. 4.3
        API Nanme: 그룹 상세 조회
        Part 1, Part 2
        [GET]
    */

/*
    API No. 4.3 - Part 1
    API Nanme: 그룹 이름, 내용, 그룹 카테고리 조회
    [GET] /group/Info?groupIdx=
*/
export const getGroupInfo = async (req, res) => {
  /*
      Query String: group, adminIdx
  */
  const groupIdx = req.query.groupIdx;
  const adminIdx = req.query.adminIdx;
  const JWT_Token_adminIdx = req.verifiedToken.adminId;

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

  if (adminIdx != JWT_Token_adminIdx){
      return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }

  // Validation (Middle) ❌ 
  /*
    + groupIdx's Status valid with GroupList Table ? - 프론트진에서 필요한 지 생각 후 Validation
    + JWT Token's adminIdx include req.groupIdx ? - 프론트에서 검증이 필요하다면, 만들어야 될 듯
  */

  // 그룹 이름, 내용 조회
  const groupInfoResult = await groupProvider.retrieveGroupInfo(groupIdx, adminIdx);

  return res.send(response(baseResponse.SUCCESS, groupInfoResult));
};


/*
    API No. 4.3 - Part 2
    API Nanme: 그룹 소속회원 조회
    [GET] /group/members?groupIdx=&page=&pageSize=
*/
export const getGroupMembers = async (req, res) => {
  /*
      Query String: groupIdx,adminIdx ,page, pageSize
  */
  const groupIdx = req.query.groupIdx;
  const adminIdx = req.query.adminIdx;
  const JWT_Token_adminIdx = req.query.adminIdx;


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

  if (adminIdx != JWT_Token_adminIdx){
      return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }

  // Validation (Middle) ❌ 
  /*
    + groupIdx's Status valid with GroupList Table ? - 프론트진에서 필요한 지 생각 후 Validation
    + JWT Token's groupIdx include req.groupIdx ? - 프론트에서 검증이 필요하다면, 만들어야 될 듯
  */

  //paging
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  if(!page || !pageSize){
      return res.send(errResponse(baseResponse.PAGING_PARAMS_EMPTY));
  }

  // 그룹 소속회원 조회
  const groupMembersResult = await groupService.retrievePagingGroupMembers(groupIdx, adminIdx, page, pageSize);

  return res.send(response(baseResponse.SUCCESS, groupMembersResult));
};




  /*
      API No. 4.4
      API Nanme: 그룹 수정
      Part 1, Part 2, Part 3
  */


/*
    API No. 4.4 - Part 1
    API Nanme: 그룹 이름, 내용, 그룹 카테고리 수정
    [PATCH] /group/info/:groupIdx/:adminIdx
*/
export const patchGroupInfo = async (req, res) => {
  /*
      Body : groupName, groupIntroduction, groupCategory
      Query String : groupIdx, adminIdx
  */
  const groupIdx = req.query.groupIdx;
  const adminIdx = req.query.adminIdx;
  const {groupName, groupIntroduction, groupCategory} = req.body;
  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  
  // Validation (basic) ✅
  if (!groupIdx){
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } else if (groupIdx <= 0) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }

  if (!groupName){
    return res.send(errResponse(baseResponse.GROUP_GROUPNAME_EMPTY));
  } else if (groupName.length > 45){
    return res.send(errResponse(baseResponse.GROUP_GROUPNAME_LENGTH));
  }

  if (!groupIntroduction){
    return res.send(errResponse(baseResponse>GROUP_GROUPINTRODUCTION_EMPTY));
  } else if (groupIntroduction.length > 200){
    return res.send(errResponse(baseResponse.GROUP_GROUPINTRODUCTION_LENGTH));
  }

  if (!groupCategory){
    return res.send(errResponse(baseResponse.GROUP_GROUPCATEGORY_EMPTY));
  } else if (groupCategory.length > 30){
    return res.send(errResponse(baseResponse.GROUP_GROUPCATEGORY_LENGTH));
  }

  if(!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } 
  if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  if (adminIdx != JWT_Token_adminIdx){
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }

  // Validation (Middle) ❌ 
  /*
    + groupIdx's Status valid with GroupList Table ? - 프론트진에서 필요한 지 생각 후 Validation
    + JWT Token's groupIdx include req.groupIdx ? - 프론트에서 검증이 필요하다면, 만들어야 될 듯
  */

  
  // 그룹 이름, 내용, 그룹 카테고리 수정
  const editGroupInfoResponse = await groupService.editGroupInfo(groupIdx, adminIdx, groupName, groupIntroduction, groupCategory);

  return res.send(editGroupInfoResponse);
}



/*
    API No. 4.4 - Part 2
    API Nanme: 그룹 소속회원 삭제
    [PATCH] /admin/group/deleteMembers/:groupIdx/:adminIdx
*/
export const patchGroupMembers = async (req, res) => {
  /*
      Body : userIdx [array type]
      Query Variable: groupIdx, adminIdx
  */
  const groupIdx = req.query.groupIdx;
  const adminIdx = req.query.adminIdx;
  const {userIdx} = req.body;
  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  
  // Validation (basic) ✅
  if (!groupIdx){
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } else if (groupIdx <= 0) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }

  var groupUserIdx;
  for (groupUserIdx of userIdx){
    if (!groupUserIdx){
      return res.send(errResponse(baseResponse.GROUP_USERIDX_EMPTY));
    } else if (groupUserIdx <= 0){
      return res.send(errResponse(baseResponse.GROUP_USERIDX_LENGTH));
    }
  }

  if(!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } 
  if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  if (adminIdx != JWT_Token_adminIdx){
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }

  // Validation (Middle) ❌ 
  /*
    + groupIdx's Status valid with GroupList Table ? - 프론트진에서 필요한 지 생각 후 Validation
    + JWT Token's groupIdx include req.groupIdx ? - 프론트에서 검증이 필요하다면, 만들어야 될 듯
    + userIdx's Status valid with User Table ? - 프론트진에서 필요한 지 생각 후 Validation
    + userIdx's Status in GroupMembers Table is ACTIVE ? - 프론트진에서 필요한 지 생각 후 Validation
  */

  // 그룹 소속회원 삭제 - transcation 적용완료
  const editGroupMembersResponse = await groupService.editGroupMembers(groupIdx, adminIdx , userIdx);

  return res.send(editGroupMembersResponse);
}



/*
    API No. 4.4 - Part 3
    API Nanme: 그룹 소속회원 추가
    [POST] /group/insertMembers/:groupIdx/:adminIdx
*/
export const postGroupMembers = async (req, res) => {
  /*
      Body : userIdx [array type]
      Query Variable: groupIdx, adminIdx
  */
  const groupIdx = req.query.groupIdx;
  const adminIdx = req.query.adminIdx;
  const {userIdx} = req.body;
  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  
  // Validation (basic) ✅
  if (!groupIdx){
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } else if (groupIdx <= 0) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }

  var groupUserIdx;
  for (groupUserIdx of userIdx){
    if (!groupUserIdx){
      return res.send(errResponse(baseResponse.GROUP_USERIDX_EMPTY));
    } else if (groupUserIdx <= 0){
      return res.send(errResponse(baseResponse.GROUP_USERIDX_LENGTH));
    }
  }

  if(!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } 
  if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  if (adminIdx != JWT_Token_adminIdx){
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }


  // Validation (Middle) ❌ 
  /*
    + groupIdx's Status valid with GroupList Table ? - 프론트진에서 필요한 지 생각 후 Validation
    + JWT Token's groupIdx include req.groupIdx ? - 프론트에서 검증이 필요하다면, 만들어야 될 듯
    + userIdx's Status valid with User Table ? - 프론트진에서 필요한 지 생각 후 Validation
    + userIdx's Status in GroupMembers Table is DELETED or NULL ? - 프론트진에서 필요한 지 생각 후 Validation (추가할 수 있는 회원 리스트 API 생성)
    + userIdx's Status in ClubMembers Table is ACTIVE ? - 프론트진에서 필요한 지 생각 후 Validation
  */

  // 그룹 소속회원 추가 - transcation 적용완료
  const createGroupMembersResponse = await groupService.insertGroupMembers(groupIdx, adminIdx, userIdx);

  return res.send(createGroupMembersResponse);
}




/*
    API No. 4.5
    API Nanme: 그룹 삭제
    [PATHCH] /group/delete/:groupIdx
*/
export const patchGroup = async (req, res) => {
  /*
      Query String: groupIdx, adminIdx
  */
  const groupIdx = req.query.groupIdx;
  const adminIdx = req.query.adminIdx;
  const JWT_Token_adminIdx = req.verifiedToken.adminId;
  
  // Validation (basic) ✅
  if (!groupIdx){
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } else if (groupIdx <= 0) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }

  if(!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } 
  if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  if (adminIdx != JWT_Token_adminIdx){
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }

  // Validation (Middle) ❌ 
  /*
    + groupIdx's Status valid with GroupList Table ? - 프론트진에서 필요한 지 생각 후 Validation
    + JWT Token's groupIdx include req.groupIdx ? - 프론트에서 검증이 필요하다면, 만들어야 될 듯
  */

  // 그룹 삭제
  const deleteGroupResponse = await groupService.deleteGroup(groupIdx, adminIdx);

  return res.send(deleteGroupResponse);
}

