import express from "express";

const attendanceRouter = express.Router();
const attendance = require("./attendanceController");
const jwtMiddleware = require("../../../config/adminJwtMiddleWare");

// 6.1 출석한 회원 리스트 조회 API
/**
 * @swagger
 * paths:
 *  /admin/attendance?scheduleIdx=#&adminIdx=#&groupIdx=#&curPage=#&pageSize=#:
 *   get:
 *     tags: [ADMIN 출석]
 *     summary: 출석한 회원 리스트 조회 API
 *     parameters:
 *         - in: header
 *           name: x-access-token
 *           schema:
 *           type: string
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxLCJpYXQiOjE2NjA4MzUwNjMsImV4cCI6MTY5MjM3MTA2Mywic3ViIjoiQWRtaW4ifQ.QCcoqBDDxDBUrHJFThfbCIDc4iisw4j52ytchxex5Ic
 *         - in: query
 *           name: scheduleIdx
 *           default: 1
 *           description: 스케줄 index
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: adminIdx
 *           default: 1
 *           description: 단체 회원 인덱스
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: groupIdx
 *           default: 1
 *           description: 그룹 index
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: curPage
 *           default: 1
 *           description: 현재 페이지
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: pageSize
 *           default: 100
 *           description: 한 페이지에 조회할 데이터 수
 *           required: true
 *           schema:
 *              type: integer
 *     responses:
 *       "1000":
 *         description: 출석한 회원 리스트 조회 API 성공
 *       "2001":
 *         description: adminIdx를 입력해주세요.
 *       "2002":
 *         description: adminIdx를 0보다 큰 수로 입력해주세요.
 *       "2020":
 *         description: adminIdx를 값을 확인해주세요.
 *       "2021":
 *         description: 스케줄 인덱스를 입력해주세요.
 *       "2022":
 *         description: 스케줄 인덱스를 0보다 큰 값으로 입력해주세요.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 *
 */
attendanceRouter.get("/", jwtMiddleware, attendance.getAttendance);

// 6.2 결석한 회원 리스트 조회 API
/**
 * @swagger
 * paths:
 *  /admin/attendance/absence?scheduleIdx=#&adminIdx=#&groupIdx=#&curPage=#&pageSize=#:
 *   get:
 *     tags: [ADMIN 출석]
 *     summary: 결석한 회원 리스트 조회 API
 *     parameters:
 *         - in: header
 *           name: x-access-token
 *           schema:
 *           type: string
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxLCJpYXQiOjE2NjA4MzUwNjMsImV4cCI6MTY5MjM3MTA2Mywic3ViIjoiQWRtaW4ifQ.QCcoqBDDxDBUrHJFThfbCIDc4iisw4j52ytchxex5Ic
 *         - in: query
 *           name: scheduleIdx
 *           default: 1
 *           description: 스케줄 index
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: adminIdx
 *           default: 1
 *           description: 단체 회원 인덱스
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: groupIdx
 *           default: 1
 *           description: 그룹 index
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: curPage
 *           default: 1
 *           description: 현재 페이지
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: pageSize
 *           default: 100
 *           description: 한 페이지에 조회할 데이터 수
 *           required: true
 *           schema:
 *              type: integer
 *     responses:
 *       "1000":
 *         description: 결석한 회원 리스트 조회 API 성공
 *       "2001":
 *         description: adminIdx를 입력해주세요.
 *       "2002":
 *         description: adminIdx를 0보다 큰 수로 입력해주세요.
 *       "2020":
 *         description: adminIdx를 값을 확인해주세요.
 *       "2021":
 *         description: 스케줄 인덱스를 입력해주세요.
 *       "2022":
 *         description: 스케줄 인덱스를 0보다 큰 값으로 입력해주세요.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 *
 */
attendanceRouter.get("/absence", jwtMiddleware, attendance.getAbsence);

// 6.3 출석코드 API 조회
/**
 * @swagger
 * paths:
 *  /admin/attendance/code?scheduleIdx=#&adminIdx=#:
 *   get:
 *     tags: [ADMIN 출석]
 *     summary: 출석코드 API 조회
 *     parameters:
 *         - in: header
 *           name: x-access-token
 *           schema:
 *           type: string
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxLCJpYXQiOjE2NjA4MzUwNjMsImV4cCI6MTY5MjM3MTA2Mywic3ViIjoiQWRtaW4ifQ.QCcoqBDDxDBUrHJFThfbCIDc4iisw4j52ytchxex5Ic
 *         - in: query
 *           name: scheduleIdx
 *           default: 1
 *           description: 스케줄 index
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: adminIdx
 *           default: 1
 *           description: 단체 회원 인덱스
 *           required: true
 *           schema:
 *              type: integer
 *     responses:
 *       "1000":
 *         description: 출석코드 조회 API 성공
 *       "2001":
 *         description: adminIdx를 입력해주세요.
 *       "2002":
 *         description: adminIdx를 0보다 큰 수로 입력해주세요.
 *       "2020":
 *         description: adminIdx를 값을 확인해주세요.
 *       "2021":
 *         description: 스케줄 인덱스를 입력해주세요.
 *       "2022":
 *         description: 스케줄 인덱스를 0보다 큰 값으로 입력해주세요.
 *       "3004":
 *         description: 이미 삭제된 스케줄입니다.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 *
 */
attendanceRouter.get("/code", jwtMiddleware, attendance.getAttendCode);

// 6.4 회원 출석 처리 API
/**
 * @swagger
 * paths:
 *  /admin/attendance?scheduleIdx=#&adminIdx=#&userIdx=#:
 *   patch:
 *     tags: [ADMIN 출석]
 *     summary: 회원 출석 처리 API
 *     parameters:
 *         - in: header
 *           name: x-access-token
 *           schema:
 *           type: string
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxLCJpYXQiOjE2NjA4MzUwNjMsImV4cCI6MTY5MjM3MTA2Mywic3ViIjoiQWRtaW4ifQ.QCcoqBDDxDBUrHJFThfbCIDc4iisw4j52ytchxex5Ic
 *         - in: query
 *           name: scheduleIdx
 *           default: 1
 *           description: 스케줄 index
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: adminIdx
 *           default: 1
 *           description: 단체 회원 인덱스
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: userIdx
 *           default: 1
 *           description: 유저 인덱스
 *           required: true
 *           schema:
 *              type: integer
 *     responses:
 *       "1000":
 *         description: 출석한 회원 리스트 조회 API 성공
 *       "2001":
 *         description: adminIdx를 입력해주세요.
 *       "2002":
 *         description: adminIdx를 0보다 큰 수로 입력해주세요.
 *       "2020":
 *         description: adminIdx를 값을 확인해주세요.
 *       "2021":
 *         description: 스케줄 인덱스를 입력해주세요.
 *       "2022":
 *         description: 스케줄 인덱스를 0보다 큰 값으로 입력해주세요.
 *       "3000":
 *         description: userIdx를 입력하세요.
 *       "3001":
 *         description: userIdx를 0보다 큰 값으로 입력해주세요.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 *
 */
attendanceRouter.patch("/", jwtMiddleware, attendance.patchAttendacne);

// 6.5 회원 결석 처리 API
/**
 * @swagger
 * paths:
 *  /admin/attendance/absence?scheduleIdx=#&adminIdx=#&userIdx=#:
 *   patch:
 *     tags: [ADMIN 출석]
 *     summary: 회원 결석 처리 API
 *     parameters:
 *         - in: header
 *           name: x-access-token
 *           schema:
 *           type: string
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxLCJpYXQiOjE2NjA4MzUwNjMsImV4cCI6MTY5MjM3MTA2Mywic3ViIjoiQWRtaW4ifQ.QCcoqBDDxDBUrHJFThfbCIDc4iisw4j52ytchxex5Ic
 *         - in: query
 *           name: scheduleIdx
 *           default: 1
 *           description: 스케줄 index
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: adminIdx
 *           default: 1
 *           description: 단체 회원 인덱스
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: userIdx
 *           default: 1
 *           description: 유저 인덱스
 *           required: true
 *           schema:
 *              type: integer
 *     responses:
 *       "1000":
 *         description: 출석한 회원 리스트 조회 API 성공
 *       "2001":
 *         description: adminIdx를 입력해주세요.
 *       "2002":
 *         description: adminIdx를 0보다 큰 수로 입력해주세요.
 *       "2020":
 *         description: adminIdx를 값을 확인해주세요.
 *       "2021":
 *         description: 스케줄 인덱스를 입력해주세요.
 *       "2022":
 *         description: 스케줄 인덱스를 0보다 큰 값으로 입력해주세요.
 *       "3000":
 *         description: userIdx를 입력하세요.
 *       "3001":
 *         description: userIdx를 0보다 큰 값으로 입력해주세요.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 *
 */
attendanceRouter.patch("/absence", jwtMiddleware, attendance.patchAbsence);

export default attendanceRouter;
