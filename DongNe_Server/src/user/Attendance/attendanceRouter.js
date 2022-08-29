import express from "express";

const userAttendanceRouter = express.Router();
const attendance = require("./attendanceController");
const jwtMiddleware = require("../../../config/userJwtMiddleWare");

// 7.1 출석코드 인증 API
/**
 * @swagger
 * paths:
 *  /user/attendance/code:
 *   post:
 *     tags: [USER 출석]
 *     summary: 출석코드 인증 API
 *     consumes:
 *         - application/json
 *     parameters:
 *         - in: header
 *           name: x-access-token
 *           schema:
 *           type: string
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxLCJpYXQiOjE2NjA4MzUwNjMsImV4cCI6MTY5MjM3MTA2Mywic3ViIjoiQWRtaW4ifQ.QCcoqBDDxDBUrHJFThfbCIDc4iisw4j52ytchxex5Ic
 *         - in: body
 *           name: attendance
 *           description: 출석 인증 파라미터
 *           required:
 *              - scheduleIdx
 *              - userIdx
 *              - attendanceCode
 *           schema:
 *              type: object
 *              properties:
 *                  scheduleIdx:
 *                      default: 1
 *                      descrpition: 스케줄 인덱스
 *                      type: integer
 *                  userIdx:
 *                      default: 1
 *                      description: 회원 인덱스
 *                      type: integer
 *                      format: date
 *                  attendanceCode:
 *                      default: "aaaa"
 *                      description: 출석 인증 코드
 *                      type: string
 *     responses:
 *       "1000":
 *         description: 출석코드 인증 API 성공
 *       "2019":
 *         description: 출석코드를 입력해주세요.
 *       "2021":
 *         description: 스케줄 인덱스를 입력해주세요.
 *       "2022":
 *         description: scheduleIdx는 0보다 큰 값으로 입력해주세요.
 *       "3000":
 *         description: userIdx를 입력해주세요.
 *       "3001":
 *         description: userIdx는 0보다 큰 값으로 입력해주세요.
 *       "3002":
 *         description: 유효하지 않는 userIdx입니다.
 *       "3003":
 *         description: 출석코드가 틀렸습니다.
 *       "3004":
 *         description: 이미 삭제된 스케줄입니다.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 */
userAttendanceRouter.post(
  "/code",
  jwtMiddleware,
  attendance.postAttendanceCode
);

export default userAttendanceRouter;
