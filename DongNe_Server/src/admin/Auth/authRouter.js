import express from "express";
const auth = require("./authController");
const adminAuthRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /admin/auth/login:
 *   post:
 *     tags: [admin 계정 관리]
 *     summary: admin 로그인 api
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: adminInfo
 *         description: admin 로그인 정보  파라미터
 *         schema:
 *            type: object
 *            required:
 *              - adminEmail
 *              - adminPwd
 *            properties:
 *                  adminEmail:
 *                        default: dongdong@gmail.com
 *                        description: admin 이메일
 *                        type: string
 *                  adminPwd:
 *                        default: dong12345
 *                        description: admin 비밀번호
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
adminAuthRouter.post("/login", auth.login);

/**
 * @swagger
 * paths:
 *  /admin/auth/register:
 *   post:
 *     tags: [admin 계정 관리]
 *     summary: admin 회원가입 api
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: adminInfo
 *         description: admin 회원가입 정보  파라미터
 *         schema:
 *            type: object
 *            required:
 *              - clubName
 *              - adminEmail
 *              - adminPwd
 *              - clubImgUrl
 *            properties:
 *                  clubName:
 *                        default: 빙글빙글
 *                        description: 동아리 이름
 *                        type: string
 *                  adminEmail:
 *                        default: dongdong@gmail.com
 *                        description: admin 이메일
 *                        type: string
 *                  adminPwd:
 *                        default: dong12345
 *                        description: admin 비밀번호
 *                        type: string
 *                  establishmentYear:
 *                        default: 2022-08-10
 *                        description: 동아리 설립년도 YYYY-MM-DD format
 *                        type: string
 *                  clubRegion:
 *                        default: 서울,경기
 *                        description: 동아리 활동 지역
 *                        type: string
 *                  clubIntroduction:
 *                        default: 동그라미를 그리는 동아리입니다.
 *                        description: 동아리 소개
 *                        type: string
 *                  clubWebLink:
 *                        default: https://www.naver.com
 *                        description: 동아리 웹사이트 링크
 *                        type: string
 *                  clubImgUrl:
 *                        description: 동아리 사진
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

adminAuthRouter.post("/register", auth.registerAdmin);

export default adminAuthRouter;
