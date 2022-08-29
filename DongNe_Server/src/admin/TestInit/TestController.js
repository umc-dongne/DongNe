const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const testProvider = require("./TestProvider");

/**
 * API No. 0.1
 * API Name : GET 테스트 API
 * [GET] /test
 */

export const getTest = (req, res) => {
  return res.send(response(baseResponse.SUCCESS));
};
/**
 * API No. 0.2
 * API Name : POST 테스트 API
 * [POST] /test
 */
export const postTest = (req, res) => {
  return res.send(response(baseResponse.SUCCESS));
};

/**
 * API No. 0.3
 * API Name : db 테스트 API
 * [GET] /test/db
 */
export const getDatabaseTest = async (req, res) => {
  const testUserResult = await testProvider.retrieveUserList();
  return res.send(testUserResult);
};
