const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const testDao = require("./testDao");

exports.retrieveUserList = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌DB Error: ${error.message}`);

  try {
    const testResult = await testDao.selectUserPosts(connection);
    connection.release();
    return response(baseResponseStatus.SUCCESS, testResult);
  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.FAILURE);
  }
};
