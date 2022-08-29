import express from "express";
const auth = require("./authController");
const userAuthRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /user/auth/login:
 *   post:
 *     tags: [user 계정 관리]
 *     summary: user 로그인 api
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: userInfo
 *         description: user 로그인 정보  파라미터
 *         schema:
 *            type: object
 *            required:
 *              - userEmail
 *              - password
 *            properties:
 *                  userEmail:
 *                        default: gkstjdwo8899@naver.com
 *                        description: user 이메일
 *                        type: string
 *                  password:
 *                        default: dong12345
 *                        description: user 비밀번호
 *                        type: string
 *     responses:
 *       "1000":
 *         description: 그룹 추가 API 성공
 *       "2008":
 *         description: 이메일을 입력하세요
 *       "2009":
 *         description: 이메일은 30자리 미만으로 입력해주세요.
 *       "2010":
 *         description: 이메일을 형식을 정확하게 입력해주세요.
 *       "2011":
 *         description: 비밀번호를 입력 해주세요.
 *       "2026":
 *         description: 비밀번호의 길이는 8자리 이상으로 입력해주세요.
 *       "3003":
 *         description: 아이디가 잘못 되었습니다.
 *       "3004":
 *         description: 비밀번호가 잘못 되었습니다.
 *       "3005":
 *         description: 비활성화 된 계정입니다. 고객센터에 문의해주세요.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 */
userAuthRouter.post("/login", auth.login);

/**
 * @swagger
 * paths:
 *  /user/auth/register:
 *   post:
 *     tags: [user 계정 관리]
 *     summary: user 회원가입 api
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: userInfo
 *         description: user 회원가입 정보  파라미터
 *         schema:
 *            type: object
 *            required:
 *              - name
 *              - phoneNum
 *              - school
 *              - birth
 *              - address
 *              - userEmail
 *              - password
 *            properties:
 *                  name:
 *                        default: 한성재
 *                        description: user 이름
 *                        type: string
 *                  userEmail:
 *                        default: gkstjdwo8899@naver.com
 *                        description: user 이메일
 *                        type: string
 *                  password:
 *                        default: dong12345
 *                        description: user 비밀번호
 *                        type: string
 *                  phoneNum:
 *                        default: 01012345678
 *                        description: 전화번호
 *                        type: string
 *                  school:
 *                        default: 중앙대학교
 *                        description: 소재 대학교
 *                        type: string
 *                  birth:
 *                        default: 2001-08-04
 *                        description: user 생년월일 YYYY-MM-DD
 *                        type: string
 *                  address:
 *                        description: user 주소
 *                        type: string
 *                  introduction:
 *                        description: user 소개
 *                        type: string
 *                  userImgUrl:
 *                        description: userHiImg.jpg
 *                        type: string
 *
 *
 *
 *
 *     responses:
 *       "1000":
 *         description: API 성공
 *       "2001":
 *         description: 이메일을 입력해주세요.
 *       "2002":
 *         description: 이메일은 30자리 미만으로 입력해주세요.
 *       "2003":
 *         description: 이메일을 형식을 정확하게 입력해주세요.
 *       "2004":
 *         description: 비밀번호를 입력 해주세요.
 *       "2005":
 *         description: 비밀번호는 8~20자리를 입력해주세요.
 *       "2008":
 *         description: 동아리 이름을 입력해주세요
 *       "3001":
 *         description: 이미 존재하는 이메일입니다.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 */

userAuthRouter.post("/register", auth.registerUser);

/**
 * @swagger
 * paths:
 *  /user/auth/joinClub:
 *   post:
 *     tags: [user 계정 관리]
 *     summary: user 동아리 가입 api
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: userIdx
 *         securitySchemes:
 *            type: integer
 *         default: 16
 *         required: true
 *         description: 유저 인덱스
 *       - in: body
 *         name: clubCode
 *         description: user 로그인 정보  파라미터
 *         schema:
 *            type: object
 *            required:
 *              - clubCode
 *            properties:
 *                  clubCode:
 *                        default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkeCI6MTksImlhdCI6MTY2MDkxMzU5OSwiZXhwIjoxNjkyNDQ5NTk5LCJzdWIiOiJBZG1pbiJ9.MJPU92-xKcYyOQF0lQgIbMZ9A8MpeVWCrEetv39hE0g
 *                        description: 동아리 가입 코드
 *                        type: string
 *     responses:
 *       "1000":
 *         description: 그룹 추가 API 성공
 *       "7001":
 *         description: 유효한 클럽코드가 아닙니다.
 *       "7002":
 *         description: 이미 본 동아리에 가입한 회원입니다.
 *       "7003":
 *         description: 존재하지 않는 유저입니다.
 *       "7004":
 *         description: 존재하지 않는 클럽입니다.
 *       "7005":
 *         description: 유저 인덱스를 입력해주세요.
 *       "7006":
 *         description: 클럽 코드를 입력해주세요.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 */

userAuthRouter.post("/joinClub", auth.joinClub);

export default userAuthRouter;
