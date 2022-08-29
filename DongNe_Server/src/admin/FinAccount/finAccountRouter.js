import express from "express";
const finAccount = require("./finAccountController");
const adminfinAccountRouter = express.Router();
import adminJwtMiddleWare from "../../../config/adminJwtMiddleWare";

//api 7.1 회계 생성 api
/**
 * @swagger
 * paths:
 *  /admin/finAccount:
 *   post:
 *     tags: [admin 회계 관리]
 *     summary: admin 회계 생성 api
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: jwt 토큰
 *         default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwODM2ODIzLCJleHAiOjE2OTIzNzI4MjMsInN1YiI6IkFkbWluIn0.6zylPZUFFS7_CN4138mkHfh69ISQ_pqguc0dVGg7bf4
 *         required: true
 *         type: string
 *       - in: body
 *         name: finAccountInfo
 *         description: 회계 정보 파라미터
 *         schema:
 *            type: object
 *            required:
 *              - adminIdx
 *              - finAccountCategoryIdx
 *              - finAccountItem
 *              - isProfit
 *              - finAccountCost
 *              - finAccountDate
 *              - etc
 *
 *            properties:
 *                  adminIdx:
 *                        default: 12
 *                        description: admin 인덱스
 *                        type: int
 *                  finAccountCategoryIdx:
 *                        default: 6
 *                        description: 카테고리 인덱스
 *                        type: int
 *                  finAccountItem:
 *                        default: 동아리 지원금
 *                        description: 회계 항목명
 *                        type: string
 *                  isProfit:
 *                        default: 1
 *                        description: 0= 비용negative, 1= 수입profit
 *                        type: string
 *                  finAccountCost:
 *                        default: 200000
 *                        description: 회계 항목 금액
 *                        type: number
 *                  finAccountDate:
 *                        default: 2022-08-15
 *                        description: 회계 항목 날짜
 *                        type: string
 *                  etc:
 *                        default: 테스트테스트 아아
 *                        description: 회계 항목 비고
 *                        type: string
 *     responses:
 *       "1000":
 *         description: 그룹 추가 API 성공
 *       "5001":
 *         description: admin 인덱스를 입력해주세요.
 *       "5002":
 *         description: finAccount 카테고리를 입력해주세요.
 *       "5003":
 *         description: isProfit을 입력해주세요.
 *       "5004":
 *         description: finAccount 항목을 입력해주세요.
 *       "5005":
 *         description: finAccount 비용을 입력해주세요.
 *       "5006":
 *         description: finAccount 날짜를 입력해주세요.
 *       "5007":
 *         description: isProfit을 0이나 1로 입력해주세요.
 *       "5008":
 *         description: cost를 숫자로 입력해주세요.
 *       "5009":
 *         description: Date를 'yyyy-mm-dd' 형식에 맞춰 입력해주세요.
 *       "5010":
 *         description: 항목 이름의 길이를 35자 이하로 작성해주세요.
 *       "5011":
 *         description: etc 이름의 길이를 180자 이하로 작성해주세요.
 *       "3005":
 *         description: 비활성화 된 계정입니다. 고객센터에 문의해주세요.
 *       "3006":
 *         description: 탈퇴 된 계정입니다. 고객센터에 문의해주세요.
 *       "6000":
 *         description: 접근할 수 없는 동아리입니다. 본인 동아리에 대해서만 접근하세요.
 *       "6002":
 *         description: 삭제된 카테고리입니다.
 *       "6006":
 *         description: 본 동아리의 카테고리가 아닙니다.
 *       "6007":
 *         description: 존재하지 않는 카테고리입니다.
 *
 *
 */
adminfinAccountRouter.post("/", adminJwtMiddleWare, finAccount.createFinAccount);

//api 7.2 회계 카테고리 생성 api
/**
 * @swagger
 * paths:
 *  /admin/finAccount/category:
 *   post:
 *     tags: [admin 회계 관리]
 *     summary: admin 회계 카테고리 생성 api
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: jwt 토큰
 *         default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwODM2ODIzLCJleHAiOjE2OTIzNzI4MjMsInN1YiI6IkFkbWluIn0.6zylPZUFFS7_CN4138mkHfh69ISQ_pqguc0dVGg7bf4
 *         required: true
 *         type: string
 *       - in: header
 *         name: adminIdx
 *         description: 클럽 admin 인덱스
 *         default: 12
 *         required: true
 *         type: integer
 *       - in: body
 *         name: finAccountInfo
 *         description: 회계 카테고리 정보 파라미터
 *         schema:
 *            type: object
 *            required:
 *              - categoryName
 *            properties:
 *                  categoryName:
 *                        default: 지원금
 *                        description: 카테고리 이름
 *                        type: string
 *     responses:
 *       "1000":
 *         description: 회계 추가 API 성공
 *       "5001":
 *         description: admin Idx 비어있음.
 *       "5012":
 *         description: 카테고리 이름을 적어주세요
 *       "5010":
 *         description: 회계 항목 이름을 35자 이하로 작성해주세요.
 *       "3005":
 *         description: 비활성화된 계정입니다.
 *       "3006":
 *         description: 탈퇴한 회원입니다.
 *       "6000":
 *         description: 접근할 수 없는 동아리입니다. 본인 동아리에 대해서만 접근하세요.
 *       "6003":
 *         description: 이미 존재하는 카테고리 이름입니다.
 */
adminfinAccountRouter.post("/category", adminJwtMiddleWare, finAccount.createFinAccCategory);

//api 7.3 최근 회계 4개 조회 api
/**
 * @swagger
 * paths:
 *  /admin/finAccount:
 *   get:
 *     tags: [admin 회계 관리]
 *     summary: 최근 회계항목 4개 조회 api
 *     parameters:
 *         - name: x-access-token
 *           in: header
 *           description: jwt 토큰
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwODM2ODIzLCJleHAiOjE2OTIzNzI4MjMsInN1YiI6IkFkbWluIn0.6zylPZUFFS7_CN4138mkHfh69ISQ_pqguc0dVGg7bf4
 *           required: true
 *           type: string
 *         - name: adminIdx
 *           in: header
 *           description: 클럽 어드민 인덱스
 *           default: 12
 *           required: true
 *           type: integer
 *     responses:
 *       "1000":
 *         description: 최근 회계 4개 조회 api 성공
 *       "5001":
 *         description: admin Idx 비어있음.
 *       "6000":
 *         description: 접근할 수 없는 동아리입니다. 본인 동아리에 대해서만 접근하세요.
 *
 */
adminfinAccountRouter.get("/", adminJwtMiddleWare, finAccount.getFinAccount);

//api 7.4 월별 회계 조회 api
/**
 * @swagger
 * paths:
 *  /admin/finAccount/month?year={year}&month={month}:
 *   get:
 *     tags: [admin 회계 관리]
 *     summary: 월별 회계 조회 api
 *     parameters:
 *         - name: x-access-token
 *           in: header
 *           description: jwt 토큰
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwODM2ODIzLCJleHAiOjE2OTIzNzI4MjMsInN1YiI6IkFkbWluIn0.6zylPZUFFS7_CN4138mkHfh69ISQ_pqguc0dVGg7bf4
 *           required: true
 *           type: string
 *         - in: header
 *           name: adminIdx
 *           description: 클럽 어드민 인덱스
 *           default: 12
 *           required: true
 *           type: integer
 *         - in: query
 *           name: year
 *           schema:
 *            type: integer
 *           description: 조회 년도
 *           default: 2022
 *         - in: query
 *           name: month
 *           schema:
 *            type: integer
 *           description: 조회 월
 *           default: 8
 *     responses:
 *       "1000":
 *         description: 월별 회계 조회 api 성공
 *       "5001":
 *         description: admin Idx 비어있음.
 *       "5014":
 *         description: 날짜의 year 비어있음.
 *       "5015":
 *         description: 날짜의 month 비어있음.
 *       "6000":
 *         description: 접근할 수 없는 동아리입니다. 본인 동아리에 대해서만 접근하세요.
 *
 *
 */
adminfinAccountRouter.get("/month", adminJwtMiddleWare, finAccount.getFinAccountMonthly);

//api 7.5 일자별 회계 조회 api
/**
 * @swagger
 * paths:
 *  /admin/finAccount/day?year={year}&month={month}&day={day}:
 *   get:
 *     tags: [admin 회계 관리]
 *     summary: 일자별 회계 조회 api
 *     parameters:
 *         - name: x-access-token
 *           in: header
 *           description: jwt 토큰
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwODM2ODIzLCJleHAiOjE2OTIzNzI4MjMsInN1YiI6IkFkbWluIn0.6zylPZUFFS7_CN4138mkHfh69ISQ_pqguc0dVGg7bf4
 *           required: true
 *           type: string
 *         - in: header
 *           name: adminIdx
 *           description: 클럽 어드민 인덱스
 *           default: 12
 *           required: true
 *           type: integer
 *         - in: query
 *           name: year
 *           default: 2022
 *           schema:
 *            type: integer
 *           description: 조회 년도
 *         - in: query
 *           name: month
 *           default: 8
 *           schema:
 *            type: integer
 *           description: 조회 월
 *         - in: query
 *           name: day
 *           default: 15
 *           schema:
 *            type: integer
 *           description: 조회 일자
 *     responses:
 *       "1000":
 *         description: 일자별 회계 조회 api 성공
 *       "5001":
 *         description: admin Idx 비어있음.
 *       "5014":
 *         description: 날짜의 year 비어있음.
 *       "5015":
 *         description: 날짜의 month 비어있음.
 *       "5016":
 *         description: 날짜의 day 비어있음.
 *       "6000":
 *         description: 접근할 수 없는 동아리입니다. 본인 동아리에 대해서만 접근하세요.
 *
 *
 */
adminfinAccountRouter.get("/day", adminJwtMiddleWare, finAccount.getFinAccountDaily);

//api 7.6 회계 카테고리 수정
/**
 *
 * @swagger
 * paths:
 *  /admin/finAccount/category/{cId}:
 *   patch:
 *     tags: [admin 회계 관리]
 *     summary: 회계 카테고리 수정 API
 *     parameters:
 *         - name: x-access-token
 *           in: header
 *           description: jwt 토큰
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwODM2ODIzLCJleHAiOjE2OTIzNzI4MjMsInN1YiI6IkFkbWluIn0.6zylPZUFFS7_CN4138mkHfh69ISQ_pqguc0dVGg7bf4
 *           required: true
 *           type: string
 *         - in: path
 *           name: cId
 *           schema:
 *              type: integer
 *           default: 2
 *           required: true
 *           description: 카테고리 인덱스
 *         - in: header
 *           name: adminIdx
 *           schema:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: admin 인덱스
 *         - in: body
 *           name: categoryInfo
 *           schema:
 *              type: object
 *              required:
 *                  - categoryName
 *              properties:
 *                  categoryName:
 *                        default: 지원금 2
 *                        description: 수정할 카테고리 이름
 *                        type: string
 *     responses:
 *       "1000":
 *         description: 회계 카테고리 수정 API 성공
 *       "5001":
 *         description: admin Idx 비어있음.
 *       "5018":
 *         description: 카테고리 이름을 적어주세요
 *       "5017":
 *         description: 카테고리 인덱스를 적어주세요.
 *       "3005":
 *         description: 비활성화된 계정입니다.
 *       "3006":
 *         description: 탈퇴한 회원입니다.
 *       "6000":
 *         description: 접근할 수 없는 동아리입니다. 본인 동아리에 대해서만 접근하세요.
 *       "6002":
 *         description: 삭제된 카테고리입니다.
 *       "6003":
 *         description: 이미 존재하는 카테고리 이름입니다.
 *       "6006":
 *         description: 본 동아리의 카테고리가 아닙니다.
 *       "6007":
 *         description: 존재하지 않는 카테고리입니다.
 */
adminfinAccountRouter.patch("/category/:cId", adminJwtMiddleWare, finAccount.patchCategory);

//api 7.7 회계 항목 수정
/**
 *
 * @swagger
 * paths:
 *  /admin/finAccount/{fId}:
 *   patch:
 *     tags: [admin 회계 관리]
 *     summary: 회계 항목 수정 API
 *     parameters:
 *         - name: x-access-token
 *           in: header
 *           description: jwt 토큰
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwODM2ODIzLCJleHAiOjE2OTIzNzI4MjMsInN1YiI6IkFkbWluIn0.6zylPZUFFS7_CN4138mkHfh69ISQ_pqguc0dVGg7bf4
 *           required: true
 *           type: string
 *         - in: path
 *           name: fId
 *           schema:
 *              type: integer
 *           default: 20
 *           required: true
 *           description: 회계 항목 인덱스
 *         - in: header
 *           name: adminIdx
 *           schema:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: admin 인덱스
 *         - in: body
 *           name: finAccountInfo
 *           schema:
 *              type: object
 *              required:
 *                 - finAccountCategoryIdx
 *                 - finAccountItem
 *                 - isProfit
 *                 - finAccountCost
 *                 - finAccountDate
 *                 - etc
 *              properties:
 *                  finAccountCategoryIdx:
 *                        default: 1
 *                        description: 카테고리 인덱스
 *                        type: int
 *                  finAccountItem:
 *                        default: 동아리 지원금
 *                        description: 회계 항목명
 *                        type: string
 *                  isProfit:
 *                        default: 1
 *                        description: 0= 비용negative, 1= 수입profit
 *                        type: string
 *                  finAccountCost:
 *                        default: 200000
 *                        description: 회계 항목 금액
 *                        type: number
 *                  finAccountDate:
 *                        default: 2022-08-15
 *                        description: 회계 항목 날짜
 *                        type: string
 *                  etc:
 *                        default: 테스트테스트 아아
 *                        description: 회계 항목 비고
 *                        type: string
 *     responses:
 *       "1000":
 *         description: 회계 카테고리 수정 API 성공
 *       "5001":
 *         description: admin 인덱스를 입력해주세요.
 *       "5002":
 *         description: finAccount 카테고리를 입력해주세요.
 *       "5003":
 *         description: isProfit을 입력해주세요.
 *       "5004":
 *         description: finAccount 항목을 입력해주세요.
 *       "5005":
 *         description: finAccount 비용을 입력해주세요.
 *       "5006":
 *         description: finAccount 날짜를 입력해주세요.
 *       "5007":
 *         description: isProfit을 0이나 1로 입력해주세요.
 *       "5008":
 *         description: cost를 숫자로 입력해주세요.
 *       "5009":
 *         description: Date를 'yyyy-mm-dd' 형식에 맞춰 입력해주세요.
 *       "5010":
 *         description: 항목 이름의 길이를 35자 이하로 작성해주세요.
 *       "5011":
 *         description: etc 이름의 길이를 180자 이하로 작성해주세요.
 *       "3005":
 *         description: 비활성화 된 계정입니다. 고객센터에 문의해주세요.
 *       "3006":
 *         description: 탈퇴 된 계정입니다. 고객센터에 문의해주세요.
 *       "6000":
 *         description: 접근할 수 없는 동아리입니다. 본인 동아리에 대해서만 접근하세요.
 *       "6002":
 *         description: 삭제된 카테고리입니다.
 *       "6004":
 *         description: 존재하지 않는 회계항목입니다.
 *       "6005":
 *         description: 이미 삭제된 회계항목입니다.
 *       "6006":
 *         description: 본 동아리의 카테고리가 아닙니다.
 *       "6007":
 *         description: 존재하지 않는 카테고리입니다.
 *       "6008":
 *         description: 본 동아리의 회계항목이 아닙니다.
 *
 */
adminfinAccountRouter.patch("/:fId", adminJwtMiddleWare, finAccount.patchFinAccount);

//api 7.8 회계 항목 삭제
/**
 *
 * @swagger
 * paths:
 *  /admin/finAccount/status/{fId}:
 *   patch:
 *     tags: [admin 회계 관리]
 *     summary: 회계 항목 삭제 API
 *     parameters:
 *         - name: x-access-token
 *           in: header
 *           description: jwt 토큰
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwODM2ODIzLCJleHAiOjE2OTIzNzI4MjMsInN1YiI6IkFkbWluIn0.6zylPZUFFS7_CN4138mkHfh69ISQ_pqguc0dVGg7bf4
 *           required: true
 *           type: string
 *         - in: path
 *           name: fId
 *           schema:
 *              type: integer
 *           default: 20
 *           required: true
 *           description: 회계 항목 인덱스
 *         - in: header
 *           name: adminIdx
 *           schema:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: admin 인덱스
 *     responses:
 *          "1000":
 *            description: 회계 카테고리 삭제 API 성공
 *          "5001":
 *            description: admin 인덱스를 입력해주세요.
 *          "5019":
 *            description: 회계 항목 idx를 적어주세요.
 *          "3005":
 *            description: 비활성화 된 계정입니다. 고객센터에 문의해주세요.
 *          "3006":
 *            description: 탈퇴 된 계정입니다. 고객센터에 문의해주세요.
 *          "6004":
 *            description: 존재하지 않는 회계항목입니다.
 *          "6005":
 *            description: 이미 삭제된 회계항목입니다.
 *          "6008":
 *            description: 본 동아리의 회계항목이 아닙니다.
 */
adminfinAccountRouter.patch("/status/:fId", adminJwtMiddleWare, finAccount.deleteFinAccount);

//api 7.9 특정 동아리의 회계 항목 카테고리 전체 조회
/**
 * @swagger
 * paths:
 *  /admin/finAccount/category:
 *   get:
 *     tags: [admin 회계 관리]
 *     summary: 특정 동아리의 회계 카테고리 전체 조회
 *     parameters:
 *         - name: x-access-token
 *           in: header
 *           description: jwt 토큰
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwODM2ODIzLCJleHAiOjE2OTIzNzI4MjMsInN1YiI6IkFkbWluIn0.6zylPZUFFS7_CN4138mkHfh69ISQ_pqguc0dVGg7bf4
 *           required: true
 *           type: string
 *         - in: header
 *           name: adminIdx
 *           description: 클럽 어드민 인덱스
 *           default: 12
 *           required: true
 *           type: integer
 *     responses:
 *       "1000":
 *         description: 회계 카테고리 조회 api 성공
 *       "5001":
 *         description: admin Idx 비어있음.
 *
 *
 */
adminfinAccountRouter.get("/category", adminJwtMiddleWare, finAccount.getFinAccountCategory);

//특정 회계 항목 조회
//api 7.10 특정 회계항목 조회
/**
 *
 * @swagger
 * paths:
 *  /admin/finAccount/{fId}:
 *   get:
 *     tags: [admin 회계 관리]
 *     summary: 특정 회계 항목 조회
 *     parameters:
 *         - name: x-access-token
 *           in: header
 *           description: jwt 토큰
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwODM2ODIzLCJleHAiOjE2OTIzNzI4MjMsInN1YiI6IkFkbWluIn0.6zylPZUFFS7_CN4138mkHfh69ISQ_pqguc0dVGg7bf4
 *           required: true
 *           type: string
 *         - in: path
 *           name: fId
 *           schema:
 *              type: integer
 *           default: 20
 *           required: true
 *           description: 회계 항목 인덱스
 *         - in: header
 *           name: adminIdx
 *           schema:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: admin 인덱스
 *     responses:
 *          "1000":
 *            description: 회계 카테고리 삭제 API 성공
 *          "5001":
 *            description: admin 인덱스를 입력해주세요.
 *          "5019":
 *            description: 회계 항목 idx를 적어주세요.
 *          "3005":
 *            description: 비활성화 된 계정입니다. 고객센터에 문의해주세요.
 *          "3006":
 *            description: 탈퇴 된 계정입니다. 고객센터에 문의해주세요.
 *          "6004":
 *            description: 존재하지 않는 회계항목입니다.
 *          "6005":
 *            description: 이미 삭제된 회계항목입니다.
 */
adminfinAccountRouter.get("/:fId", adminJwtMiddleWare, finAccount.getFinAccountByIdx);

//api 7.11 특정 동아리 회계 날짜 전체 조회
/**
 *
 * @swagger
 * paths:
 *  /admin/finAccount/dates/{aId}:
 *   get:
 *     tags: [admin 회계 관리]
 *     summary: 특정 동아리 회계 날짜 전체 조회
 *     parameters:
 *         - name: x-access-token
 *           in: header
 *           description: jwt 토큰
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwODM2ODIzLCJleHAiOjE2OTIzNzI4MjMsInN1YiI6IkFkbWluIn0.6zylPZUFFS7_CN4138mkHfh69ISQ_pqguc0dVGg7bf4
 *           required: true
 *           type: string
 *         - in: path
 *           name: aId
 *           schema:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: admin 인덱스
 *     responses:
 *          "1000":
 *            description: 특정 동아리 회계 날짜 전체 조회 api 성공
 *          "5001":
 *            description: admin 인덱스를 입력해주세요.
 *          "3005":
 *            description: 비활성화 된 계정입니다. 고객센터에 문의해주세요.
 *          "3006":
 *            description: 탈퇴 된 계정입니다. 고객센터에 문의해주세요.
 *          "6000":
 *            description: 접근할 수 없는 동아리입니다. 본인 동아리에 대해서만 접근하세요.
 */
adminfinAccountRouter.get("/dates/:aId", adminJwtMiddleWare, finAccount.getFinAccountDates);

//api 7.12 특정 동아리의 월별 회계 카테고리 조회 api
/**
 * @swagger
 * paths:
 *  /admin/finAccount/category/month?year={year}&month={month}:
 *   get:
 *     tags: [admin 회계 관리]
 *     summary: 월별 회계 카테고리 조회 api
 *     parameters:
 *         - name: x-access-token
 *           in: header
 *           description: jwt 토큰
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwODM2ODIzLCJleHAiOjE2OTIzNzI4MjMsInN1YiI6IkFkbWluIn0.6zylPZUFFS7_CN4138mkHfh69ISQ_pqguc0dVGg7bf4
 *           required: true
 *           type: string
 *         - in: header
 *           name: adminIdx
 *           description: 클럽 어드민 인덱스
 *           default: 12
 *           required: true
 *           type: integer
 *         - in: query
 *           name: year
 *           schema:
 *            type: integer
 *           description: 조회 년도
 *           default: 2022
 *         - in: query
 *           name: month
 *           schema:
 *            type: integer
 *           description: 조회 월
 *           default: 8
 *     responses:
 *       "1000":
 *         description: 월별 회계 카테고리 조회 api 성공
 *       "5001":
 *         description: admin Idx 비어있음.
 *       "5014":
 *         description: 날짜의 year 비어있음.
 *       "5015":
 *         description: 날짜의 month 비어있음.
 *       "6000":
 *         description: 접근할 수 없는 동아리입니다. 본인 동아리에 대해서만 접근하세요.
 *
 *
 */
adminfinAccountRouter.get("/category/month", adminJwtMiddleWare, finAccount.getFACategoryMonthly);

export default adminfinAccountRouter;
