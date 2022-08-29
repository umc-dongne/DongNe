import express from "express";
// import { getDatabaseTest } from "./groupController";
const group = require("./groupController");
const userJwtMiddleWare = require("../../../config/userJwtMiddleWare");

const groupRouter = express.Router();

// Route Test
groupRouter.get("/db", group.getDatabaseTest);



// 5.1 유저가 속한 그룹 리스트 조회
/**
 * @swagger
 * paths:
 *  /user/group?adminIdx={adminIdx}&userIdx={userIdx}&page={page}&pageSize={pageSize}:
 *   get:
 *     tags: [USER 출석 그룹]
 *     summary: 유저가 속한 그룹 리스트 조회 API
 *     parameters:
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 11
 *           required: true
 *           description: 동아리 인덱스
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           default: 16
 *           required: true
 *           description: (본인)유저 인덱스
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
 *           default: 12
 *           required: true
 *           description: 한 페이지에 조회할 데이터 수
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
 *         description: 유저가 속한 그룹 리스트 조회 API 성공
 *       "2001":
 *         description: 파라미터 (adminIdx)를 입력하세요.
 *       "2002":
 *         description: 단체 인덱스를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 * 
 */
groupRouter.get("/", userJwtMiddleWare, group.getGroupList);




// 5.2 유저가 속한 그룹 상세 조회
// 그룹 이름, 내용, 그룹 카테고리 조회 - part 1
// Query String
/**
 * @swagger
 * paths:
 *  /user/group/info?groupIdx={groupIdx}&adminIdx={adminIdx}&userIdx={userIdx}:
 *   get:
 *     tags: [USER 출석 그룹]
 *     summary: 그룹 정보(그룹 이름, 내용) 조회 API
 *     parameters:
 *         - in: query
 *           name: groupIdx
 *           securitySchemes:
 *              type: integer
 *           default: 64
 *           required: true
 *           description: 그룹 인덱스
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 11
 *           required: true
 *           description: 동아리 인덱스
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
 *         description: 그룹 정보(그룹이름, 내용) 조회 API 성공
 *       "4007":
 *         description: 파라미터 (groupIdx)를 입력하세요.
 *       "4008":
 *         description: 그룹 인덱스를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.get("/info", userJwtMiddleWare, group.getGroupInfo);

// 그룹 소속회원 조회 - part 2
// Query String
/**
 * @swagger
 * paths:
 *  /user/group/members?groupIdx={groupIdx}&adminIdx={adminIdx}&userIdx={userIdx}&page={page}&pageSize={pageSize}:
 *   get:
 *     tags: [USER 출석 그룹]
 *     summary: 그룹 소속회원 조회 API
 *     parameters:
 *         - in: query
 *           name: groupIdx
 *           securitySchemes:
 *              type: integer
 *           default: 64
 *           required: true
 *           description: 그룹 인덱스
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 11
 *           required: true
 *           description: 동아리 인덱스
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           default: 16
 *           required: true
 *           description: (본인) 유저 인덱스
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
 *           default: 12
 *           required: true
 *           description: 한 페이지에 조회할 데이터 수
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
 *         description: 그룹 소속회원 조회 API 성공
 *       "4007":
 *         description: 파라미터 (groupIdx)를 입력하세요.
 *       "4008":
 *         description: 그룹 인덱스를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.get("/members", userJwtMiddleWare, group.getGroupMembers);


export default groupRouter;
