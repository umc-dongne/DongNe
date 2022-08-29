import express from "express";
// import { getDatabaseTest } from "./groupController";
const group = require("./groupController");
const adminJwtMiddleWare = require("../../../config/adminJwtMiddleWare");

const groupRouter = express.Router();

// Route Test
groupRouter.get("/db", group.getDatabaseTest);

// 4.1 그룹 추가
/**
 * @swagger
 * paths:
 *  /admin/group:
 *   post:
 *     tags: [ADMIN 출석 그룹]
 *     summary: 그룹 추가 API
 *     consumes:
 *       - application/json
 *     parameters:
 *         - in: body
 *           name: group
 *           description: 그룹 파라미터
 *           schema:
 *              type: object
 *              required:
 *                - adminIdx
 *                - groupName
 *                - groupIntroduction
 *                - groupCategory
 *                - userIdx
 *              properties:
 *                    adminIdx:
 *                          description: 동아리 인덱스
 *                          type: integer
 *                          default: 12
 *                    groupName:
 *                          description: 그룹 이름
 *                          type: string
 *                    groupIntroduction:
 *                          description: 그룹 소개
 *                          type: string
 *                    groupCategory:
 *                          description: 그룹 카테고리
 *                          type: string
 *                          default: "#"
 *                    userIdx:
 *                          description: 유저 인덱스 배열
 *                          type: arrry
 *                          default: [1,2,3]
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
 *         description: 그룹 추가 API 성공
 *       "2001":
 *         description: 파라미터 (adminIdx)를 입력하세요.
 *       "4001":
 *         description: 그룹 이름을 입력하세요.
 *       "4002":
 *         description: 그룹 이름은 45자 이하로 입력가능합니다.
 *       "4003":
 *         description: 그룹 소개를 입력하세요.
 *       "4004":
 *         description: 그룹 소개는 200자 이하로 입력가능합니다.
 *       "4005":
 *         description: 그룹에 추가할 userIdx를 입력하세요.
 *       "4006":
 *         description: 그룹에 추가할 userIdx를 0보다 큰 값으로 입력하세요.
 *       "4009":
 *         description: 그룹 카테고리를 입력하세요.
 *       "4010":
 *         description: 그룹 카테고리를 30자 이내로 입력가능합니다.
 *       "6001":
 *         description: 본인 동아리에서 대해서만 작업을 수행할 수 있습니다.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.post("/", adminJwtMiddleWare ,group.postGroup);



// 4.2 그룹 리스트 조회
// Query String
/**
 * @swagger
 * paths:
 *  /admin/group?adminIdx={adminIdx}&page={page}&pageSize={pageSize}:
 *   get:
 *     tags: [ADMIN 출석 그룹]
 *     summary: 그룹 리스트 (그룹 이름, 그룹 카테고리) 조회 API
 *     parameters:
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: 단체 인덱스
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
 *         description: 유저가 속한 그룹 리스트 조회 API 성공
 *       "2001":
 *         description: 파라미터 (adminIdx)를 입력하세요.
 *       "2002":
 *         description: 단체 인덱스를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 * 
 */
groupRouter.get("/", adminJwtMiddleWare ,group.getGroupList);



// 4.3 그룹 상세 조회
// TO DO : 4
// 그룹 이름, 내용, 그룹 카테고리 조회 - part 1
// Query String
/**
 * @swagger
 * paths:
 *  /admin/group/info?groupIdx={groupIdx}&adminIdx={adminIdx}:
 *   get:
 *     tags: [ADMIN 출석 그룹]
 *     summary: 그룹 정보(그룹 이름, 내용, 그룹 카테고리) 조회 API
 *     parameters:
 *         - in: query
 *           name: groupIdx
 *           securitySchemes:
 *              type: integer
 *           default: 63
 *           required: true
 *           description: 그룹 인덱스
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
 *         description: 그룹 정보(그룹이름, 내용) 조회 API 성공
 *       "4007":
 *         description: 파라미터 (groupIdx)를 입력하세요.
 *       "4008":
 *         description: 그룹 인덱스를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.get("/info", adminJwtMiddleWare ,group.getGroupInfo);

// 그룹 소속회원 조회 - part 2
// Query String
/**
 * @swagger
 * paths:
 *  /admin/group/members?groupIdx={groupIdx}&adminIdx={adminIdx}&page={page}&pageSize={pageSize}:
 *   get:
 *     tags: [ADMIN 출석 그룹]
 *     summary: 그룹 소속회원 조회 API
 *     parameters:
 *         - in: query
 *           name: groupIdx
 *           securitySchemes:
 *              type: integer
 *           default: 63
 *           required: true
 *           description: 그룹 인덱스
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
 *           default: 5
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
 *         description: 그룹 소속회원 조회 API 성공
 *       "4007":
 *         description: 파라미터 (groupIdx)를 입력하세요.
 *       "4008":
 *         description: 그룹 인덱스를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.get("/members", adminJwtMiddleWare ,group.getGroupMembers);


// 4.4 그룹 수정
// TO DO : 5
// 그룹 이름, 내용, 그룹 카테고리 수정
// Path Variable & Body
/**
 * @swagger
 * paths:
 *  /admin/group/info?groupIdx={groupIdx}&adminIdx={adminIdx}:
 *   patch:
 *     tags: [ADMIN 출석 그룹]
 *     summary: 그룹 정보(그룹 이름, 내용, 그룹 카테고리) 수정 API
 *     consumes:
 *         - application/json
 *     parameters:
 *         - in: query
 *           name: groupIdx
 *           schema:
 *              type: integer
 *           default: 61
 *           required: true
 *           description: 그룹 인덱스
 *         - in: query
 *           name: adminIdx
 *           schema:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: 동아리 인덱스
 *         - in: body
 *           name: group
 *           description: 그룹 파라미터
 *           schema:
 *              type: object
 *              required:
 *                - groupName
 *                - groupIntroduction
 *                - groupCategory
 *              properties:
 *                    groupName:
 *                          description: 그룹 이름
 *                          type: string
 *                          default: "Java 스터디그룹"
 *                    groupIntroduction:
 *                          description: 그룹 소개
 *                          type: string
 *                          default: "Java 기초문법을 배우는 스터디 그룹입니다."
 *                    groupCategory:
 *                          description: 그룹 카테고리
 *                          type: string
 *                          default: "#"
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
 *         description: 그룹 정보(그룹 이름, 내용) 수정 API 성공
 *       "4007":
 *         description: 파라미터 (groupIdx)를 입력하세요.
 *       "4008":
 *         description: 그룹 인덱스를 0보다 큰 값으로 입력하세요.
 *       "4001":
 *         description: 그룹 이름은 45자 이하로 입력가능합니다.
 *       "4002":
 *         description: 그룹 이름을 입력하세요.
 *       "4003":
 *         description: 그룹 소개를 입력하세요.
 *       "4004":
 *         description: 그룹 소개를 200자 이하로 입력가능합니다.
 *       "4009":
 *         description: 그룹 카테고리를 입력하세요.
 *       "4010":
 *         description: 그룹 카테고리를 30자 이내로 입력가능합니다.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.patch("/info", adminJwtMiddleWare ,group.patchGroupInfo);


// 그룹 회원삭제
// Path Variable & Body
/**
 * @swagger
 * paths:
 *  /admin/group/deleteMembers?groupIdx={groupIdx}?adminIdx={adminIdx}:
 *   patch:
 *     tags: [ADMIN 출석 그룹]
 *     summary: 그룹 소속회원 삭제 수정 API
 *     consumes:
 *         - application/json
 *     parameters:
 *         - in: query
 *           name: groupIdx
 *           schema:
 *              type: integer
 *           default: 61
 *           required: true
 *           description: 그룹 인덱스
 *         - in: query
 *           name: adminIdx
 *           schema:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: 동아리 인덱스
 *         - in: body
 *           name: group
 *           description: 그룹 파라미터
 *           schema:
 *              type: object
 *              required:
 *                - userIdx
 *              properties:
 *                    userIdx:
 *                         description: 유저 인덱스 배열
 *                         type: arrry
 *                         default: [1,2,3]
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
 *         description: 그룹 소속회원 삭제 수정 API 성공
 *       "2010":
 *         description: 이미 그룹에서 삭제된 userIdx or 그룹에 속하지 않는 userIdx or 동아리에 속하지 않는 userIdx or 동네 웹을 탈퇴한 userIdx
 *       "4007":
 *         description: 파라미터 (groupIdx)를 입력하세요.
 *       "4008":
 *         description: 그룹 인덱스를 0보다 큰 값으로 입력하세요.
 *       "4005":
 *         description: 삭제할 유저 인덱스를 입력하세요.
 *       "4006":
 *         description: 삭제할 유저 인덱스를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.patch("/deleteMembers", adminJwtMiddleWare ,group.patchGroupMembers);

// 그룹 회원추가
// Path Variable & Body
/**
 * @swagger
 * paths:
 *  /admin/group/insertMembers?groupIdx={groupIdx}&adminIdx={adminIdx}:
 *   post:
 *     tags: [ADMIN 출석 그룹]
 *     summary: 그룹 소속회원 추가 수정 API
 *     consumes:
 *         - application/json
 *     parameters:
 *         - in: query
 *           name: groupIdx
 *           schema:
 *              type: integer
 *           default: 61
 *           required: true
 *           description: 그룹 인덱스
 *         - in: query
 *           name: adminIdx
 *           schema:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: 동아리 인덱스
 *         - in: body
 *           name: group
 *           description: 그룹 파라미터
 *           schema:
 *              type: object
 *              required:
 *                - userIdx
 *              properties:
 *                    userIdx:
 *                        description: 유저 인덱스 배열
 *                        type: arrry
 *                        default: [1,2,3]
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
 *         description: 그룹 소속회원 추가 수정 API 성공
 *       "4007":
 *         description: 파라미터 (groupIdx)를 입력하세요.
 *       "4008":
 *         description: 그룹 인덱스를 0보다 큰 값으로 입력하세요.
 *       "4005":
 *         description: 추가할 유저 인덱스를 입력하세요.
 *       "4006":
 *         description: 추가할 유저 인덱스를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.post("/insertMembers", adminJwtMiddleWare ,group.postGroupMembers);

// 4.5 그룹 삭제
// TO DO : 6
// Path Variable
/**
 * @swagger
 * paths:
 *  /admin/group/delete?groupIdx={groupIdx}&adminIdx={adminIdx}:
 *   patch:
 *     tags: [ADMIN 출석 그룹]
 *     summary: 그룹 삭제 API
 *     parameters:
 *         - in: query
 *           name: groupIdx
 *           schema:
 *              type: integer
 *           default: 61
 *           required: true
 *           description: 그룹 인덱스
 *         - in: query
 *           name: adminIdx
 *           schema:
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
 *         description: 그룹 삭제 API 성공
 *       "2009":
 *         description: 이미 삭제된 groupIdx or 본인 동아리에 속하지 않은 groupIdx or 존재하지 않은 groupIdx
 *       "4007":
 *         description: 파라미터 (groupIdx)를 입력하세요.
 *       "4008":
 *         description: 그룹 인덱스를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.patch("/delete", adminJwtMiddleWare ,group.patchGroup);

export default groupRouter;
