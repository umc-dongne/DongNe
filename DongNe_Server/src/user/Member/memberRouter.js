import express from "express";
// import  {getDatabaseTest, getClubMemberList} from "./memberController";
const member = require("./memberController");
const userJwtMiddleWare = require("../../../config/userJwtMiddleWare");

const memberRouter = express.Router();

// Route Test
memberRouter.get("/db", member.getDatabaseTest);

// 4.1 단체 모든 회원명단 리스트 조회 API
/**
 * @swagger
 * paths:
 *  /user/member?adminIdx={adminIdx}&page={page}&pageSize={pageSize}&userIdx={userIdx}:
 *   get:
 *     tags: [USER 회원 명단]
 *     summary: 단체 모든 회원명단 리스트 조회 API
 *     parameters:
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 11
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
 *           description: 한 페이지에서 조회할 데이터 수
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           default: 16
 *           required: true
 *           description: 유저 인덱스
 *         - in: header
 *           name: x-access-token
 *           description: 헤더에 JWT_userIdx 토큰을 입력하세요
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxNiwiaWF0IjoxNjYwODYwMzc2LCJleHAiOjE2OTIzOTYzNzYsInN1YiI6IkFkbWluIn0.ebitK_QPLpMABjAiPpFa_IjSm0fcrHQz4l34lYZhtr4
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_userIdx
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
memberRouter.get("/", userJwtMiddleWare, member.getClubMemberList);


// 4.2 회원 상세 조회 API
/**
 * @swagger
 * paths:
 *  /user/member/info?retrieveUserIdx={retrieveUserIdx}&userIdx={userIdx}&adminIdx={adminIdx}:
 *   get:
 *     tags: [USER 회원 명단]
 *     summary: 회원 상세 조회 API
 *     parameters:
 *         - in: query
 *           name: retrieveUserIdx
 *           securitySchemes:
 *              type: integer
 *           default: 1
 *           required: true
 *           description: 상세 조회할 유저 인덱스
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           default: 16
 *           required: true
 *           description: (본인)유저 인덱스
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 11
 *           required: true
 *           description: 동아리 인덱스
 *         - in: header
 *           name: x-access-token
 *           description: 헤더에 JWT_userIdx 토큰을 입력하세요
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxNiwiaWF0IjoxNjYwODYwMzc2LCJleHAiOjE2OTIzOTYzNzYsInN1YiI6IkFkbWluIn0.ebitK_QPLpMABjAiPpFa_IjSm0fcrHQz4l34lYZhtr4
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_userIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: 단체 모든 회원명단 리스트 조회 API 성공
 *       "3000":
 *         description: 파라미터(adminIdx)를 입력하세요.
 *       "3001":
 *         description: adminIdx는 0보다 큰 값으로 입력해주세요.
 *       "3002":
 *         description: 유효하지 않은 adminIdx입니다. (INACTIVE or DELETED)
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
memberRouter.get("/info", userJwtMiddleWare, member.getMemberInfo);


// 추가 API

// 4.3 회원의 소속 동아리 리스트 조회 API
/**
 * @swagger
 * paths:
 *  /user/member/home?userIdx={userIdx}:
 *   get:
 *     tags: [USER 회원 명단]
 *     summary: 회원의 소속 동아리 리스트 조회 API
 *     parameters:
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           default: 16
 *           required: true
 *           description: (본인)유저 인덱스
 *         - in: header
 *           name: x-access-token
 *           description: 헤더에 JWT_userIdx 토큰을 입력하세요
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxNiwiaWF0IjoxNjYwODYwMzc2LCJleHAiOjE2OTIzOTYzNzYsInN1YiI6IkFkbWluIn0.ebitK_QPLpMABjAiPpFa_IjSm0fcrHQz4l34lYZhtr4
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_userIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: 단체 모든 회원명단 리스트 조회 API 성공
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
memberRouter.get("/home", userJwtMiddleWare, member.getClubList);


// 추가 API
// 4.4 개인 회원의 마이페이지 수정 API
/**
 * @swagger
 * paths:
 *  /user/member/mypage?userIdx={userIdx}:
 *   patch:
 *     tags: [USER 회원 명단]
 *     summary: 개인 회원의 마이페이지 수정 API
 *     parameters:
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           default: 16
 *           required: true
 *           description: (본인)유저 인덱스
 *         - in: body
 *           name: ClubTeamList
 *           description: 개인 회원 마이페이지 수정 파라미터
 *           schema:
 *              type: object
 *              required:
 *                - name
 *                - school
 *                - phoneNum
 *                - birth
 *                - address
 *                - introduction
 *              properties:
 *                    name:
 *                        description: 유저의 이름
 *                        type: string
 *                        default: "미노이"
 *                    school:
 *                        description: 유저의 소속 학교
 *                        type: string
 *                        default: "한양대 에리카"
 *                    phoneNum:
 *                        description: 유저의 전화번호
 *                        type: string
 *                        default: "01012345678"
 *                    birth:
 *                        description: 유저의 생년월일
 *                        type: date
 *                        default: "1997-04-09"
 *                    address:
 *                        description: 유저의 주소
 *                        type: string
 *                        default: "서울"
 *                    introduction:
 *                        description: 유저의 한줄 소개
 *                        type: string
 *                        default: "기억 니은 댄스를 쳐보아요 ㄱㄴ댄스를 쳐보아요 !!"
 *                  
 *         - in: header
 *           name: x-access-token
 *           description: 헤더에 JWT_userIdx 토큰을 입력하세요
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxNiwiaWF0IjoxNjYwODYwMzc2LCJleHAiOjE2OTIzOTYzNzYsInN1YiI6IkFkbWluIn0.ebitK_QPLpMABjAiPpFa_IjSm0fcrHQz4l34lYZhtr4
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_userIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: 개인 회원의 마이페이지 수정 API 성공
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
memberRouter.patch("/mypage", userJwtMiddleWare, member.patchUserMypage);


// 4.5 회원의 동아리 메인홈 정보 조회 API
/**
 * @swagger
 * paths:
 *  /user/member/mainhome?userIdx={userIdx}&adminIdx={adminIdx}:
 *   get:
 *     tags: [USER 회원 명단]
 *     summary: 회원의 동아리 메인홈 정보 조회 API
 *     parameters:
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           default: 16
 *           required: true
 *           description: (본인)유저 인덱스
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 11
 *           required: true
 *           description: 동아리 인덱스
 *         - in: header
 *           name: x-access-token
 *           description: 헤더에 JWT_userIdx 토큰을 입력하세요
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxNiwiaWF0IjoxNjYwODYwMzc2LCJleHAiOjE2OTIzOTYzNzYsInN1YiI6IkFkbWluIn0.ebitK_QPLpMABjAiPpFa_IjSm0fcrHQz4l34lYZhtr4
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_userIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: 회원의 동아리 메인홈 정보 조회 API 성공
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
memberRouter.get("/mainhome", userJwtMiddleWare, member.getMemberMainhome);

// 4.6 회원의 마이페이지 정보 조회 API
/**
 * @swagger
 * paths:
 *  /user/member/mypage?userIdx={userIdx}&adminIdx={adminIdx}:
 *   get:
 *     tags: [USER 회원 명단]
 *     summary: 회원의 마이페이지 정보 조회 API
 *     parameters:
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           default: 16
 *           required: true
 *           description: (본인)유저 인덱스
 *         - in: header
 *           name: x-access-token
 *           description: 헤더에 JWT_userIdx 토큰을 입력하세요
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxNiwiaWF0IjoxNjYwODYwMzc2LCJleHAiOjE2OTIzOTYzNzYsInN1YiI6IkFkbWluIn0.ebitK_QPLpMABjAiPpFa_IjSm0fcrHQz4l34lYZhtr4
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_userIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: 회원의 마이페이지 정보 조회 API 성공
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
memberRouter.get("/mypage", userJwtMiddleWare, member.getUserMypage);

export default memberRouter;
