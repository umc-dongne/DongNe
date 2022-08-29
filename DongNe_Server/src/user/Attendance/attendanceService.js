const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const attendanceDao = require("./attendanceDao");
const scheduleProvider = require("../Schedule/scheduleProvider");

exports.editAttendance = async function (scheduleIdx, userIdx, attendanceCode) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    // check schedule active
    const scheduleStatusResult = await scheduleProvider.checkScheduleStatus(
      scheduleIdx
    );
    if (scheduleStatusResult != "ACTIVE") {
      connection.release();
      return errResponse(baseResponse.SCHEDULE_STATUS_INACTIVE);
    }

    // check user active
    const userStatusResult = await attendanceDao.checkUserStatus(
      connection,
      userIdx
    );
    if (userStatusResult[0].status != "ACTIVE") {
      connection.release();
      return errResponse(baseResponse.USER_USERIDX_STATUS);
    }

    // 1. attendance code auth
    const postAttendCodeParams = [attendanceCode, scheduleIdx];
    const attendCodeResult = await attendanceDao.insertAttendanceCode(
      connection,
      postAttendCodeParams
    );

    if (attendCodeResult[0].success == 0) {
      connection.release();
      return errResponse(baseResponse.ATTENDANCE_ERROR);
    }

    // 2. update attendance
    const editAttendParams = [scheduleIdx, userIdx];
    await attendanceDao.updateAttendance(connection, editAttendParams);

    connection.release();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};
