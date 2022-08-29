const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const memberProvider = require("./memberProvider");
const memberService = require("./memberService");
const moment = require("moment");




/*
    API No. 0.0
    API Nanme: DB 테스트 API
    [GET] /member/db
*/
export const getDatabaseTest = async (req, res) => {
    const testUserResult = await memberProvider.retrieveUserList();
    return res.send(testUserResult);
  };


/*
    API No. 4.1
    API Nanme: 단체 모든 회원명단 리스트 조회 API
    [GET] /member?adminIdx=
*/
export const getClubMemberList = async (req, res) => {
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
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  }
  if (userIdx <= 0) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  if (userIdx != JWT_token_userIdx){
      return res.send(errResponse(baseResponse.JWT_USER_TOKEN_DIFFERENT))
  }

  

  // validation (middle) ❌
  /*
    adminIdx's Status valid with Admin Table ? 
    JWT Token's userIdx and req.adminIdx by ClubMembers Table is status "ACTIVE" ? (WHERE ID)
  */

  /*
  const clubStatus = await memberProvider.checkClubStatus(adminIdx);
  if (clubStatus != "ACTIVE"){
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_STATUS));
  }
  */

  //paging
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  if(!page || !pageSize){
      return res.send(errResponse(baseResponse.PAGING_PARAMS_EMPTY));
  }


  // 단체 모든 회원명단 리스트 조회
  const clubMemberListResult = await memberService.retrievePagingClubMemberList(adminIdx, userIdx, page, pageSize);

  return res.send(response(baseResponse.SUCCESS, clubMemberListResult));
};


/*
    API No. 4.2
    API Nanme: 회원 상세 조회 API
    [GET] /member/info?userIdx
*/
export const getMemberInfo = async (req, res) => {
    /*
        Query String: userIdx
    */
    const retrieveUserIdx = req.query.retrieveUserIdx;
    const userIdx = req.query.userIdx;
    const JWT_token_userIdx = req.verifiedToken.adminId;
    const adminIdx = req.query.adminIdx;
  
    // validation (basic) ✅
    if(!retrieveUserIdx) {
        return res.send(errResponse(baseResponse.USER_RETRIEVEUSERIDX_EMPTY));
    } 
    if (retrieveUserIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_RETRIEVEUSERIDX_LENGTH));
    }

    if(!adminIdx) {
        return res.send(errResponse(baseResponse.USER_ADMINIDX_EMPTY));
    } 
    if (adminIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_ADMINIDX_LENGTH));
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


    // validation (middle) ❌
    /*
        userIdx's Status valid with User Table ?
        JWT Token's userIdx and req.userIdx by ClubMembers Table is status "ACTIVE" ? (WHERE ID)
    */

    /*
    const userStatus = await memberProvider.checkUserStatus(userIdx);
    if (userStatus != "ACTIVE"){
        return res.send(errResponse(baseResponse.USER_USERIDX_STATUS));
    }
    */


    // 회원 상세 조회
    const memberInfoResult = await memberProvider.retrieveMemberInfo(retrieveUserIdx, adminIdx, userIdx);
  
    return res.send(response(baseResponse.SUCCESS, memberInfoResult));
  };


/*
    API No. 4.3
    API Nanme: 회원의 소속 동아리 리스트 조회 API
    [GET] /member/home?userIdx=
*/

export const getClubList = async (req, res) => {
    /*
        Query String: userIdx
    */
    const userIdx = req.query.userIdx;
    const JWT_token_userIdx = req.verifiedToken.adminId;

  
    // validation (basic) ✅
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (userIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    }

    if (userIdx != JWT_token_userIdx){
        return res.send(errResponse(baseResponse.JWT_USER_TOKEN_DIFFERENT));
    }


    // validation (middle)
    /*
        별다른 Validation (middle)이 필요가 없음.
        - 동아리 리스트 조회 API이므로, adminIdx Status 체크가 필요없다. 왜냐, adminIdx로 접근하여 작업을 수행하는 API가 아니기에..!
    */


    // 회원의 소속 동아리 리스트 조회
    const clubListResult = await memberProvider.retrieveClubList(userIdx);
  
    return res.send(response(baseResponse.SUCCESS, clubListResult));
  };



/*
    API No. 4.4
    API Nanme: 개인 회원의 마이페이지 수정 API
    [GET] /member/mypage?userIdx=
*/

export const patchUserMypage = async (req, res) => {
    /*
        Query String: userIdx
        Body: name, school, phoneNum, birth, address, introduction
    */
    const userIdx = req.query.userIdx;
    const JWT_token_userIdx = req.verifiedToken.adminId;
    const {name, school, phoneNum, birth, address, introduction} = req.body

  
    // validation (basic) ✅
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (userIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    }

    if (userIdx != JWT_token_userIdx){
        return res.send(errResponse(baseResponse.JWT_USER_TOKEN_DIFFERENT));
    }


    if(!name) {
        return res.send(errResponse(baseResponse.USER_NAME_EMPTY));
    } 
    if (name.length > 30) {
        return res.send(errResponse(baseResponse.USER_NAME_LENGTH));
    }

    if(!birth) {
        return res.send(errResponse(baseResponse.USER_BIRTH_EMPTY));
    } 
    if (
        !moment(birth, "YYYY/MM/DD", true).isValid() &&
        !moment(birth, "YYYY-MM-DD", true).isValid()) {
        return res.send(errResponse(baseResponse.USER_BIRTH_TYPE));
    }

    if(!school) {
        return res.send(errResponse(baseResponse.USER_SCHOOL_EMPTY));
    } 
    if (school.length > 45) {
        return res.send(errResponse(baseResponse.USER_SCHOOL_LENGTH));
    }

    if(!phoneNum) {
        return res.send(errResponse(baseResponse.USER_PHONENUM_EMPTY));
    } 
    if (phoneNum.length > 45) {
        return res.send(errResponse(baseResponse.USER_PHONENUM_LENGTH));
    }

    if(!address) {
        return res.send(errResponse(baseResponse.USER_ADDRESS_EMPTY));
    } 
    if (address.length > 100) {
        return res.send(errResponse(baseResponse.USER_ADDRESS_LENGTH));
    }

    if(!introduction) {
        return res.send(errResponse(baseResponse.USER_INTRODUCTION_EMPTY));
    }
    if(introduction.length > 450) {
        return res.send(errResponse(baseResponse.USER_INTRODUCTION_LENGTH));
    }

    


    // validation (middle)
    /*
        Auth 로그인 API를 통해 userIdx가 유효한 사용자임을 Validation 검증을 함.
        그래서 여기선 별도의 Validation (middle) 존재하지 않음.
    */


    // 개인 회원의 마이페이지 수정 
    const editUserMypageResult = await memberService.editUserMypage(userIdx, name, school, phoneNum, birth, address, introduction);
  
    return res.send(response(baseResponse.SUCCESS));
  };



/*
    API No. 4.5
    API Nanme: 회원의 동아리 메인 홈 정보 조회 API
    [GET] /member/info?userIdx
*/
export const getMemberMainhome = async (req, res) => {
    /*
        Query String: userIdx, adminIdx
    */
    const userIdx = req.query.userIdx;
    const JWT_token_userIdx = req.verifiedToken.adminId;
    const adminIdx = req.query.adminIdx;
  
    // validation (basic) ✅
    if(!adminIdx) {
        return res.send(errResponse(baseResponse.USER_ADMINIDX_EMPTY));
    } 
    if (adminIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_ADMINIDX_LENGTH));
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


    // validation (middle) 
    /*
        Validation Check's adminIdx Status
    */


    // 회원의 동아리 메인 홈 정보 조회
    const memberMainhomeResult = await memberProvider.retrieveMemberMainhome(adminIdx, userIdx);
  
    return res.send(response(baseResponse.SUCCESS, memberMainhomeResult));
  };

/*
    API No. 4.6
    API Nanme: 회원의 마이페이지 정보 조회 API
    [GET] /member/mypage?userIdx=
*/
export const getUserMypage = async (req, res) => {
    /*
        Query String: userIdx
    */
    const userIdx = req.query.userIdx;
    const JWT_token_userIdx = req.verifiedToken.adminId;
  
    // validation (basic) ✅
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (userIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    }

    if (userIdx != JWT_token_userIdx){
        return res.send(errResponse(baseResponse.JWT_USER_TOKEN_DIFFERENT));
    }


    // validation (middle) 
    /*
        Validation Check's adminIdx Status
    */


    // 회원의 마이페이지 조회
    const userMypageInfoResult = await memberProvider.retrieveUserMypageInfo(userIdx);
  
    return res.send(response(baseResponse.SUCCESS, userMypageInfoResult));
  };
