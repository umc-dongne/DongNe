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
    API No. 3.1
    API Nanme: 단체 모든 회원명단 리스트 조회 API
    [GET] /member?adminIdx=&page=&pageSize=
*/
export const getClubMemberList = async (req, res) => {
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

  // validation (middle) ✅
  /*
    adminIdx's Status valid with Admin Table ? - auth에서 이미 검증함.
    JWT Token's adminIdx include req.adminIdx ?
  */
  if(adminIdx != JWT_Token_adminIdx){
      return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }


  //paging ✅
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  if(!page || !pageSize){
      return res.send(errResponse(baseResponse.PAGING_PARAMS_EMPTY));
  }


  // 단체 모든 회원명단 리스트 조회 - Paging 적용
  const clubMemberListResult = await memberService.retrievePagingClubMemberList(adminIdx, page, pageSize);

  return res.send(response(baseResponse.SUCCESS, clubMemberListResult));
};


/*
    API No. 3.2
    API Nanme: 회원 상세 조회 API
    [GET] /member/info?userIdx=&adminIdx=
*/
export const getMemberInfo = async (req, res) => {
    /*
        Query String: userIdx, adminIdx
    */
    const userIdx = req.query.userIdx;
    const adminIdx = req.query.adminIdx;
    const JWT_Token_adminIdx = req.verifiedToken.adminId;
  
    // validation (basic) ✅
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (userIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
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

    // validation (middle) ✅
    /*
        userIdx's Status valid with User Table ? -> 프엔 개발자의 휴먼에러를 막기위해서 필요
        (대체)JWT Token's adminIdx include req.userIdx ? 
        (대체된 것) memberProvider Validation
    */

    /* -> memberProvider의 Validation으로 옮김.
    const userStatus = await memberProvider.checkUserStatus(userIdx);
    if (userStatus != "ACTIVE"){
        return res.send(errResponse(baseResponse.USER_USERIDX_STATUS));
    }
    */

    /* -> memberProvider의 Validation으로 대체가능함.
    const tokenUserStatus = await memberProvider.checkTokenUserStatus(userIdx, JWT_Token_adminIdx);
    if (tokenUserStatus != "ACTIVE"){
        return res.send(errResponse(baseResponse.JWT_TOKEN_API_3_2));
    }
    */



    // 회원 상세 조회
    const memberInfoResult = await memberProvider.retrieveMemberInfo(userIdx, JWT_Token_adminIdx);
  
    return res.send(response(baseResponse.SUCCESS, memberInfoResult));
  };


/*
    API No. 3.3
    API Nanme: 회원 삭제 API
    [PATCH] /member?userIdx=
*/
export const patchMember = async (req, res) => {
    /*
        Query String: userIdx, adminIdx
    */
    const userIdx = req.query.userIdx;
    const JWT_Token_adminIdx = req.verifiedToken.adminId;
    const adminIdx = req.query.adminIdx;
  
    // validation (basic) ✅
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (userIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
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

    // validation (middle) ✅
    /*
        userIdx's Status valid with User Table ? - 프론트진에서 의미가 있는지는 확인필요 아래와 동일논리
        JWT Token's adminIdx include req.userIdx as ACTIVE ? - 프론트에서 검증이 필요하다면, 만들어야 될 듯
    */
    /*
    const userStatus = await memberProvider.checkUserStatus(userIdx);
    if (userStatus != "ACTIVE"){
        return res.send(errResponse(baseResponse.USER_USERIDX_STATUS));
    }
    */

    // 회원 삭제
    const deleteMemberResult = await memberService.deleteMember(userIdx, adminIdx);
  
    return res.send(deleteMemberResult);
  };


/*
    API No. 3.4
    API Nanme: 동아리의 회원 팀/조 카테고리 추가 API
    [PATCH] /member/update/:adminIdx
*/
export const postClubTeam = async (req, res) => {
    /*
        Path Variable: adminIdx
        Body: teamName
    */
    const adminIdx = req.params.adminIdx;
    const {teamName} = req.body;
    const JWT_Token_adminIdx = req.verifiedToken.adminId;
    // validation (basic) ✅
    if(!adminIdx) {
        return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
    } 
    if (adminIdx <= 0) {
        return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
    }

    if(!teamName) {
        return res.send(errResponse(baseResponse.ADMIN_TEAMNAME_EMPTY));
    }
    if (teamName.length > 40) {
        return res.send(errResponse(baseResponse.ADMIN_TEAMNAME_LENGTH));
    }

    if(JWT_Token_adminIdx != adminIdx) {
        return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
    } 



    // validation (middle)
    /*
        별다른 validation이 필요없음.
    */

    // 동아리의 회원 팀/조 카테고리 추가하기
    const createClubTeamResult = await memberService.createClubTeam(adminIdx, teamName);
  
    return res.send(createClubTeamResult);
  };


/*
    API No. 3.5
    API Nanme: 동아리 소속회원 팀/조 카테고리 적용 API
    [PATCH] /member/update?userIdx=
*/
export const patchMemberClubTeam = async (req, res) => {
    /*
        query string: userIdx, adminIdx
        Body: teamName
    */
    const userIdx = req.query.userIdx;
    const adminIdx = req.query.adminIdx;
    const {clubTeamListIdx} = req.body;
    const JWT_Token_adminIdx = req.verifiedToken.adminId;

    // validation (basic) ✅
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (userIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    }

    if(!adminIdx) {
        return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
    } 
    if (adminIdx <= 0) {
        return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
    }

    if(!clubTeamListIdx) {
        return res.send(errResponse(baseResponse.ADMIN_CLUBTEAMLISTIDX_EMPTY));
    }
    if (clubTeamListIdx <= 0) {
        return res.send(errResponse(baseResponse.ADMIN_CLUBTEAMLISTIDX_LENGTH));
    }

    if(JWT_Token_adminIdx != adminIdx) {
        return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
    }

    // validation (middle) ❌
    /*
        userIdx's include with adminIdx
        clubTeamListIdx's valid with clubTeamList Table
    */

    // 동아리의 소속회원 팀/조 카테고리 적용하기
    const updateMemberClubTeamResult = await memberService.updateMemberClubTeam(clubTeamListIdx, userIdx, adminIdx);
  
    return res.send(updateMemberClubTeamResult);
  };


/*
    API No. 3.6
    API Nanme: 동아리 마이페이지 수정 API
    [PATCH] /member/mypage?adminIdx
*/
export const patchMyPage = async (req, res) => {
    /*
        query string: adminIdx
        Body: clubName, establishmentYear, clubRegion, clubWebLink, clubIntroduction, clubCategoryIdx
    */
    const adminIdx = req.query.adminIdx;
    const {clubName, establishmentYear, clubRegion, clubWebLink, clubIntroduction, clubCategoryIdx} = req.body;
    const JWT_Token_adminIdx = req.verifiedToken.adminId;

    // validation (basic) ✅
    if(!adminIdx) {
        return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
    } 
    if (adminIdx <= 0) {
        return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
    }

    if(JWT_Token_adminIdx != adminIdx) {
        return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
    }

    // Validation (basic - body) ✅
    if(!clubName) {
        return res.send(errResponse(baseResponse.ADMIN_CLUBNAME_EMPTY));
    } 
    if (clubName.length > 45) {
        return res.send(errResponse(baseResponse.ADMIN_CLUBNAME_LENGTH));
    }

    if(!establishmentYear) {
        return res.send(errResponse(baseResponse.ADMIN_ESTABLISHMENTYEAR_EMPTY));
    } 
    if (
        !moment(establishmentYear, "YYYY/MM/DD", true).isValid() &&
        !moment(establishmentYear, "YYYY-MM-DD", true).isValid()) {
        return res.send(errResponse(baseResponse.ADMIN_ESTABLISHMENTYEAR_TYPE));
    }

    if(!clubRegion) {
        return res.send(errResponse(baseResponse.ADMIN_CLUBREGION_EMPTY));
    } 
    if (clubRegion.length > 45) {
        return res.send(errResponse(baseResponse.ADMIN_CLUREGION_LENGTH));
    }

    if(!clubWebLink) {
        return res.send(errResponse(baseResponse.ADMIN_CLUBWEBLINK_EMPTY));
    } 
    if (clubWebLink > 45) {
        return res.send(errResponse(baseResponse.ADMIN_CLUBWEBLINK_LENGTH));
    }

    if(!clubIntroduction) {
        return res.send(errResponse(baseResponse.ADMIN_CLUBINTRODUCTION_EMPTY));
    }
    
    if(!clubCategoryIdx) {
        return res.send(errResponse(baseResponse.ADMIN_CLUBCATEGORYIDX_EMPTY));
    } 
    if (clubCategoryIdx < 0) {
        return res.send(errResponse(baseResponse.ADMIN_CLUBCATEGORYIDX_LENGTH));
    }
    // Validation (middle)
    /*
        별다른 middle Validation 검증이 필요없음.
        - 이미 Auth에서 adminIdx Status 검증을 함. -
    */

    // 동아리 마이페이지 수정
    const editClubMypageResult = await memberService.editClubMypage(adminIdx, clubName, establishmentYear, clubRegion, clubWebLink, clubIntroduction, clubCategoryIdx);
  
    return res.send(editClubMypageResult);
  };


/*
    API No. 3.7
    API Nanme: 어드민의 동아리 메인 홈 정보 조회 API
    [GET] /member/mainhome?adminIdx
*/
export const getAdminMainhome = async (req, res) => {
    /*
        Query String: adminIdx
    */
    const adminIdx = req.query.adminIdx;
    const JWT_token_adminIdx = req.verifiedToken.adminId;
  
    // validation (basic) ✅
    if(!adminIdx) {
        return res.send(errResponse(baseResponse.USER_ADMINIDX_EMPTY));
    } 
    if (adminIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_ADMINIDX_LENGTH));
    }

    if (adminIdx != JWT_token_adminIdx){
        return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
    }


    // validation (middle) 
    /*
        별다른 Validation (middle) 필요하지 않음.
        - Validation 검증 완료한 adminIdx만으로 API 조회를 수행하기 때문..!
        if 인증이 완료가 안된 req.data를 이용한다면 Validation (middle) 필요
    */


    // 어드민의 동아리 메인 홈 정보 조회
    const adminMainhomeResult = await memberProvider.retrieveAdminMainhome(adminIdx);
  
    return res.send(response(baseResponse.SUCCESS, adminMainhomeResult));
  };


/*
    API No. 3.8
    API Nanme: 어드민의 동아리 마이페이지 정보 조회 API
    [GET] /member/mainhome?adminIdx
*/
export const getAdminMypageInfo = async (req, res) => {
    /*
        Query String: adminIdx
    */
    const adminIdx = req.query.adminIdx;
    const JWT_token_adminIdx = req.verifiedToken.adminId;
  
    // validation (basic) ✅
    if(!adminIdx) {
        return res.send(errResponse(baseResponse.USER_ADMINIDX_EMPTY));
    } 
    if (adminIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_ADMINIDX_LENGTH));
    }

    if (adminIdx != JWT_token_adminIdx){
        return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
    }


    // validation (middle) 
    /*
        별다른 Validation (middle) 필요하지 않음.
        - Validation 검증 완료한 adminIdx만으로 API 조회를 수행하기 때문..!
        if 인증이 완료가 안된 req.data를 이용한다면 Validation (middle) 필요
    */


    // 어드민의 동아리 마이페이지 정보 조회
    const adminMypageInfoResult = await memberProvider.retrieveAdminMypageInfo(adminIdx);
  
    return res.send(response(baseResponse.SUCCESS, adminMypageInfoResult));
  };