import express from "express";
import { getTest, postTest, getDatabaseTest } from "./TestController";

const testRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /test:
 *   get:
 *     tags: [test]
 *     summary: 테스트
 *     responses:
 *       "1000":
 *         description: GET 테스트 API 성공
 *   post:
 *     tags: [test]
 *     summary: 테스트
 *     parameters:
 *       - name: parameter
 *         in: Post
 *         type: parameter type
 *         description: 파라미터 설명
 *     responses:
 *       "1000":
 *         description: POST 테스트 API 성공
 *       "2000":
 *         description: 잘못된 파라메타 전달
 *
 */
testRouter.get("/", getTest).post("/", postTest);
/**
 * @swagger
 * paths:
 *  /test/db:
 *   get:
 *     tags: [test]
 *     summary: 테스트 DB
 *     responses:
 *       "1000":
 *         description: GET 테스트 DB API 성공
 *       "2000":
 *         description: GET 테스트 DB API 실패
 *
 *
 */
testRouter.get("/db", getDatabaseTest);
export default testRouter;
