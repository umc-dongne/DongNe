import express from "express";

const userScheduleRouter = express.Router();
const schedule = require("./scheduleController");
const jwtMiddleware = require("../../../config/userJwtMiddleWare");

// 6.1 스케줄 리스트 조회 API
/**
 * @swagger
 * paths:
 *  /user/schedule/list?groupIdx=#&userIdx=#&curPage=#&pageSize=#:
 *   get:
 *     tags: [USER 스케줄]
 *     summary: 스케줄 리스트 조회 API
 *     parameters:
 *         - in: header
 *           name: x-access-token
 *           schema:
 *           type: string
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxLCJpYXQiOjE2NjA4MzUwNjMsImV4cCI6MTY5MjM3MTA2Mywic3ViIjoiQWRtaW4ifQ.QCcoqBDDxDBUrHJFThfbCIDc4iisw4j52ytchxex5Ic
 *         - in: query
 *           name: groupIdx
 *           default: 1
 *           description: 그룹 인덱스
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: userIdx
 *           default: 1
 *           description: 회원 인덱스
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
 *         description: 스케줄 리스트 조회 API 성공
 *       "2017":
 *         description: groupIdx를 입력해주세요.
 *       "2018":
 *         description: groupIdx는 0보다 큰 값으로 입력해주세요.
 *       "3000":
 *         description: userIdx를 입력해주세요.
 *       "3001":
 *         description: userIdx를 0보다 큰 수로 입력해주세요.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 *
 */
userScheduleRouter.get("/list", jwtMiddleware, schedule.getSchedule);

// 6.2 스케줄 상세 조회 API
/**
 * @swagger
 * paths:
 *  /user/schedule?scheduleIdx=#&userIdx=#:
 *   get:
 *     tags: [USER 스케줄]
 *     summary: 스케줄 리스트 조회 API
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
 *           description: 스케줄 인덱스
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: userIdx
 *           default: 1
 *           description: 회원 인덱스
 *           required: true
 *           schema:
 *              type: integer
 *     responses:
 *       "1000":
 *         description: 스케줄 상세 조회 API
 *       "2021":
 *         description: 스케줄 인덱스를 입력해주세요.
 *       "2022":
 *         description: scheduleIdx는 0보다 큰 값으로 입력해주세요.
 *       "3000":
 *         description: userIdx를 입력해주세요.
 *       "3001":
 *         description: userIdx를 0보다 큰 수로 입력해주세요.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 *
 */
userScheduleRouter.get("/", jwtMiddleware, schedule.getScheduleInfo);

export default userScheduleRouter;
