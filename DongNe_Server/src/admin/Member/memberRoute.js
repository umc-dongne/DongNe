import express from "express";
// import  {getDatabaseTest, getClubMemberList} from "./memberController";
const member = require("./memberController");
const adminJwtMiddleWare = require("../../../config/adminJwtMiddleWare");

const memberRouter = express.Router();

// Route Test
memberRouter.get("/db", member.getDatabaseTest);

/*
    개발 노트 (8/12) 📝
    jwtMiddleWare 를 통과했다는 의미는 로그인을 성공해서 헤더에 jwt 토큰을 제공한 상황임.

    - authController
    jwt token은 로그인하면 발급을 해준다.
    여기서 jwt token은 어드민의 계정상태가 ACTIVE 이면서, {이메일, 비밀번호}가 일치할 때 발급을 수행한다.

    - jwtMiddleWare
    발급 받은 jwt token을 jwtMiddleWare에서 올바른 token인지 검증을 진행한다.
    따라서, jwtMiddleWare 를 통과한 건 ACTIVE 상태(동네 웹에 등록된 어드민)인 어드민 클라이언트가 접근을 했다를 의미한다.

        그렇기에, 어드민 side의 API에서 필요한 Validation을 기록했다.
        - 로그인 한 어드민이 자신의 권한에 맞는 API 요청을 하는지에 대한 Validation 필요
*/

// 3.1 단체 모든 회원명단 리스트 조회 API
/**
 * @swagger
 * paths:
 *  /admin/member?adminIdx={adminIdx}&page={page}&pageSize={pageSize}:
 *   get:
 *     tags: [ADMIN 회원 명단]
 *     summary: 단체 모든 회원명단 리스트 조회 API
 *     parameters:
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: 동아리 인덱스
 *         - in: query
 *           name: page
 *           securitySchemes:
 *              type: integer
 *           default: 1
 *           required: true
 *           description: 조회할 페이지 쪽 수
 *         - in: query
 *           name: pageSize
 *           securitySchemes:
 *              type: integer
 *           default: 10
 *           required: true
 *           description: 한 페이지에 조회할 데이터 수
 *         - in: header
 *           name: x-access-token
 *           description: 헤더에 JWT_adminIdx 토큰을 입력하세요
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple     
 *     responses:
 *       "1000":
 *         description: 단체 모든 회원명단 리스트 조회 API 성공
 *       "2001":
 *         description: 파라미터(adminIdx)를 입력하세요.
 *       "2002":
 *         description: adminIdx는 0보다 큰 값으로 입력해주세요.
 *       "2003":
 *         description: 유효하지 않은 adminIdx입니다. (INACTIVE or DELETED)
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
memberRouter.get("/",adminJwtMiddleWare ,member.getClubMemberList);


// 3.2 회원 상세 조회 API
/**
 * @swagger
 * paths:
 *  /admin/member/info?userIdx={userIdx}&adminIdx={adminIdx}:
 *   get:
 *     tags: [ADMIN 회원 명단]
 *     summary: 회원 상세 조회 API
 *     parameters:
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           default: 6
 *           required: true
 *           description: 유저 인덱스
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: 동아리 인덱스
 *         - in: header
 *           name: x-access-token
 *           description: 헤더에 JWT_adminIdx 토큰을 입력하세요
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: 단체 모든 회원명단 리스트 조회 API 성공
 *       "3000":
 *         description: 파라미터(userIdx)를 입력하세요.
 *       "3001":
 *         description: userIdx는 0보다 큰 값으로 입력해주세요.
 *       "3002":
 *         description: 유효하지 않은 userIdx입니다. (INACTIVE or DELETED or NULL[동아리에 속하지 않은 회원 or 동네 웹에 존재하지 않은 회원])
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
memberRouter.get("/info",adminJwtMiddleWare ,member.getMemberInfo);




// 3.3 회원 삭제하기
// Query String
// JWT Token 적용하고 진행
/**
 * @swagger
 * paths:
 *  /admin/member?userIdx={userIdx}&adminIdx={adminIdx}:
 *   patch:
 *     tags: [ADMIN 회원 명단]
 *     summary: 회원 삭제 API
 *     parameters:
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           default: 3
 *           required: true
 *           description: 유저 인덱스
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: 동아리 인덱스
 *         - in: header
 *           name: x-access-token
 *           description: 헤더에 JWT_adminIdx 토큰을 입력하세요
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: 회원 삭제 API 성공
 *       "3000":
 *         description: 파라미터(userIdx)를 입력하세요.
 *       "3001":
 *         description: userIdx는 0보다 큰 값으로 입력해주세요.
 *       "3002":
 *         description: 유효하지 않은 userIdx입니다. (INACTIVE or DELETED or NULL[동아리에 속하지 않은 회원 or 동네 웹에 존재하지 않은 회원])
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
memberRouter.patch("/",adminJwtMiddleWare ,member.patchMember);



// 3.4 동아리의 회원 팀/조 카테고리 추가하기
/**
 * @swagger
 * paths:
 *  /admin/member/update/{adminIdx}:
 *   post:
 *     tags: [ADMIN 회원 명단]
 *     summary: 동아리의 회원 팀/조 카테고리 추가 API
 *     parameters:
 *         - in: path
 *           name: adminIdx
 *           Schemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: 동아리 인덱스
 *         - in: body
 *           name: ClubTeamList
 *           description: 팀/조 파라미터
 *           schema:
 *              type: object
 *              required:
 *                - teamName
 *              properties:
 *                    teamName:
 *                        description: 팀/조 이름
 *                        type: string
 *         - in: header
 *           name: x-access-token
 *           description: 헤더에 JWT_adminIdx 토큰을 입력하세요
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: 동아리의 회원 팀/조 카테고리 추가 API 성공
 *       "2001":
 *         description: 파라미터(adminIdx)를 입력하세요.
 *       "2002":
 *         description: adminIdx는 0보다 큰 값으로 입력해주세요.
 *       "2004":
 *         description: teamName을 입력해주세요.
 *       "2005":
 *         description: teamName은 40자 이내로 입력가능합니다.
 *       "5000":
 *         description: 데이터 베이스 에러
 *       "6000":
 *         description: 접근할 수 없는 동아리입니다. 본인 동아리에 대해서만 접근하세요.
 *
 */
memberRouter.post("/update/:adminIdx", adminJwtMiddleWare, member.postClubTeam);

// 3.5 동아리 소속회원 팀/조 카테고리 적용하기
/**
 * @swagger
 * paths:
 *  /admin/member/update?userIdx={userIdx}&adminIdx={adminIdx}:
 *   patch:
 *     tags: [ADMIN 회원 명단]
 *     summary: 동아리의 회원 팀/조 카테고리 적용 API
 *     parameters:
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           default: 3
 *           required: true
 *           description: 유저 인덱스
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: 동아리 인덱스
 *         - in: body
 *           name: ClubTeamList
 *           description: 팀/조 파라미터
 *           schema:
 *              type: object
 *              required:
 *                - clubTeamListIdx
 *              properties:
 *                    clubTeamListIdx:
 *                        description: 팀/조 인덱스
 *                        type: int
 *                        default: 11
 *         - in: header
 *           name: x-access-token
 *           description: 헤더에 JWT_adminIdx 토큰을 입력하세요
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: 동아리 소속회원 팀/조 카테고리 적용 API 성공
 *       "3000":
 *         description: 파라미터(userIdx)를 입력하세요.
 *       "3001":
 *         description: userIdx를 0보다 큰 값으로 입력해주세요.
 *       "2001":
 *         description: 파라미터(adminIdx)를 입력해주세요.
 *       "2002":
 *         description: adminIdx를 0보다 큰 값으로 입력해주세요.
 *       "2006":
 *         description: 파라미터(clubTeamListIdx)를 입력해주세요.
 *       "2007":
 *         description: clubTeamListIdx를 0보다 큰 값으로 입력해주세요.
 *       "2008":
 *         description: 유효하지 않은 userIdx입니다. [INACTIVE or DELETED or NULL[동아리에 속하지 않은 회원 or 동네 웹에 존재하지 않은 회원]
 *       "3002":
 *         description: 유효하지 않은 clubTeamListIdx입니다. [INACTIVE or DELETED or NULL[동아리에 속하지 않은 팀/조 카테고리]
 *       "5000":
 *         description: 데이터 베이스 에러
 *       "6000":
 *         description: 접근할 수 없는 동아리입니다. 본인 동아리에 대해서만 접근하세요.
 *
 */
memberRouter.patch("/update", adminJwtMiddleWare, member.patchMemberClubTeam);


// 추가 API
// 3.6 동아리 마이페이지 정보 수정하기
/**
 * @swagger
 * paths:
 *  /admin/member/mypage?adminIdx={adminIdx}:
 *   patch:
 *     tags: [ADMIN 회원 명단]
 *     summary: 동아리의 마이페이지 수정 API
 *     parameters:
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: 동아리 인덱스
 *         - in: body
 *           name: ClubTeamList
 *           description: 마이페이지 수정 파라미터
 *           schema:
 *              type: object
 *              required:
 *                - clubName
 *                - establishmentYea
 *                - clubRegion
 *                - clubWebLink
 *                - clubIntroduction
 *                - clubCategoryIdx
 *              properties:
 *                    clubName:
 *                        description: 동아리 이름
 *                        type: string
 *                        default: "마하"
 *                    establishmentYear:
 *                        description: 동아리 설립 연도
 *                        type: date
 *                        default: "2022-03-07"
 *                    clubRegion:
 *                        description: 동아리 활동 지역
 *                        type: string
 *                        default: "안산/에리카"
 *                    clubWebLink:
 *                        description: 동아리 웹 사이트
 *                        type: string
 *                        default: "http://maha.com"
 *                    clubIntroduction:
 *                        description: 동아리 소개
 *                        type: string
 *                        default: "마하의 속도로 평평한 에리카 부지에서 보드를 타는 동아리입니다."
 *                    clubCategoryIdx:
 *                        description: 동아리 카테고리 인덱스
 *                        type: int
 *                        default: 1
 * 
 *         - in: header
 *           name: x-access-token
 *           description: 헤더에 JWT_adminIdx 토큰을 입력하세요
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: 동아리의 마이페이지 수정 API 성공
 *       "3000":
 *         description: 파라미터(userIdx)를 입력하세요.
 *       "3001":
 *         description: userIdx를 0보다 큰 값으로 입력해주세요.
 *       "2001":
 *         description: 파라미터(adminIdx)를 입력해주세요.
 *       "2002":
 *         description: adminIdx를 0보다 큰 값으로 입력해주세요.
 *       "2006":
 *         description: 파라미터(clubTeamListIdx)를 입력해주세요.
 *       "2007":
 *         description: clubTeamListIdx를 0보다 큰 값으로 입력해주세요.
 *       "2008":
 *         description: 유효하지 않은 userIdx입니다. [INACTIVE or DELETED or NULL[동아리에 속하지 않은 회원 or 동네 웹에 존재하지 않은 회원]
 *       "3002":
 *         description: 유효하지 않은 clubTeamListIdx입니다. [INACTIVE or DELETED or NULL[동아리에 속하지 않은 팀/조 카테고리]
 *       "5000":
 *         description: 데이터 베이스 에러
 *       "6000":
 *         description: 접근할 수 없는 동아리입니다. 본인 동아리에 대해서만 접근하세요.
 *
 */
memberRouter.patch("/mypage", adminJwtMiddleWare, member.patchMyPage);

// 3.7 어드민의 동아리 메인 홈 정보 조회 API
/**
 * @swagger
 * paths:
 *  /admin/member/mainhome?adminIdx={adminIdx}:
 *   get:
 *     tags: [ADMIN 회원 명단]
 *     summary: 어드민의 동아리 메인홈 정보 조회 API
 *     parameters:
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: 동아리 인덱스
 *         - in: header
 *           name: x-access-token
 *           description: 헤더에 JWT_adminIdx 토큰을 입력하세요
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: 어드민의 동아리 메인홈 정보 조회 API 성공
 *       "3000":
 *         description: 파라미터(userIdx)를 입력하세요.
 *       "3001":
 *         description: userIdx를 0보다 큰 값으로 입력해주세요.
 *       "3008":
 *         description: 동네 웹에서 유효하지 않은 userIdx입니다 (탈퇴한 회원 or 비활성화 한 회원).
 *       "6003":
 *         description: userIdx가 입력하신 토큰과 다릅니다. 본인의 userIdx에 대해서만 접근하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
memberRouter.get("/mainhome", adminJwtMiddleWare, member.getAdminMainhome);


// 3.8 어드민의 동아리 마이페이지 정보 조회 API
/**
 * @swagger
 * paths:
 *  /admin/member/mypage?adminIdx={adminIdx}:
 *   get:
 *     tags: [ADMIN 회원 명단]
 *     summary: 어드민의 동아리 마이페이지 정보 조회 API
 *     parameters:
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: 동아리 인덱스
 *         - in: header
 *           name: x-access-token
 *           description: 헤더에 JWT_adminIdx 토큰을 입력하세요
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: 어드민의 동아리 마이페이지 정보 조회 API 성공
 *       "3000":
 *         description: 파라미터(userIdx)를 입력하세요.
 *       "3001":
 *         description: userIdx를 0보다 큰 값으로 입력해주세요.
 *       "3008":
 *         description: 동네 웹에서 유효하지 않은 userIdx입니다 (탈퇴한 회원 or 비활성화 한 회원).
 *       "6003":
 *         description: userIdx가 입력하신 토큰과 다릅니다. 본인의 userIdx에 대해서만 접근하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
memberRouter.get("/mypage", adminJwtMiddleWare, member.getAdminMypageInfo);


export default memberRouter;