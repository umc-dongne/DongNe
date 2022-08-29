const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const attendanceDao = require("./attendanceDao");

exports.editAttendance = async function (scheduleIdx, userIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    // query params
    const attendParams = [scheduleIdx, userIdx];
    // query
    const editAttendResult = await attendanceDao.updateAttendance(
      connection,
      attendParams
    );
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};

exports.editAbsence = async function (scheduleIdx, userIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    // query params
    const absenceParams = [scheduleIdx, userIdx];
    // query
    const editAbsenceResult = await attendanceDao.updateAbsence(
      connection,
      absenceParams
    );
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};
