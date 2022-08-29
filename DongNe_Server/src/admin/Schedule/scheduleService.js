const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const scheduleDao = require("./scheduleDao");
const attendanceDao = require("../Attendance/attendanceDao");
const scheduleProvider = require("./scheduleProvider");

// transaction 추가 ✅
exports.postSchedule = async function (postScheduleParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    // transaction begin
    await connection.beginTransaction();

    // 1. select user
    const selectUserResult = await scheduleDao.selectUser(connection, postScheduleParams[0]);

    // 2. post schedule
    const insertScheduleResult = await scheduleDao.insertSchedule(connection, postScheduleParams);

    // 3. attendance schedule
    const scheduleIdx = insertScheduleResult.insertId;
    for (var i = 0; i < selectUserResult.length; i++) {
      const postAttendParams = [selectUserResult[i].userIdx, scheduleIdx];
      const insertAttendResult = await attendanceDao.insertAttendance(connection, postAttendParams);
    }

    // transaction commit
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    // transaction rollback
    await connection.rollback();
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

// transaction 추가 ✅
exports.editSchedule = async function (scheduleIdx, editScheduleParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    // 1. check active
    const scheduleStatusResult = await scheduleProvider.checkScheduleStatus(scheduleIdx);
    if (scheduleStatusResult != "ACTIVE") {
      return errResponse(baseResponse.SCHEDULE_STATUS_INACTIVE);
    }

    // transaction begin
    await connection.beginTransaction();

    // 2. edit date
    if (editScheduleParams.scheduleDate !== undefined) {
      const editDateParams = [editScheduleParams.scheduleDate, scheduleIdx];
      const updateScheduleDateResult = await scheduleDao.updateScheduleDate(connection, editDateParams);
    }
    // 3. edit init_time
    if (editScheduleParams.init_time !== undefined) {
      const editInitTimeParams = [editScheduleParams.init_time, scheduleIdx];
      const updateInitTimeResult = await scheduleDao.updateScheduleInitTime(connection, editInitTimeParams);
    }
    // 4. edit end_time
    if (editScheduleParams.end_time !== undefined) {
      const editEndTimeParams = [editScheduleParams.end_time, scheduleIdx];
      await scheduleDao.updateScheduleEndTime(connection, editEndTimeParams);
    }
    // 5. edit introduction
    if (editScheduleParams.introduction !== undefined) {
      const editIntroParams = [editScheduleParams.introduction, scheduleIdx];
      const updateIntroResult = await scheduleDao.updateScheduleIntro(connection, editIntroParams);
    }
    // 6. edit place
    if (editScheduleParams.place !== undefined) {
      const editPlaceParams = [editScheduleParams.place, scheduleIdx];
      await scheduleDao.updateSchedulePlace(connection, editPlaceParams);
    }
    // 7. edit scheduleName
    if (editScheduleParams.scheduleName !== undefined) {
      const editNameParams = [editScheduleParams.scheduleName, scheduleIdx];
      await scheduleDao.updateScheduleName(connection, editNameParams);
    }
    // 8. edit scheduleCode
    if (editScheduleParams.code !== undefined) {
      const editCodeParams = [editScheduleParams.code, scheduleIdx];
      await scheduleDao.updateScheduleCode(connection, editCodeParams);
    }
    // 9. edit scheduleEtc
    if (editScheduleParams.etc != undefined) {
      const editEtcParams = [editScheduleParams.etc, scheduleIdx];
      await scheduleDao.updateScheduleEtc(connection, editEtcParams);
    }
    // transaction commit
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    // transaction rollback
    await connection.rollback();
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

exports.editScheduleStatus = async function (scheduleIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const scheduleStatusResult = await scheduleProvider.checkScheduleStatus(scheduleIdx);

    if (scheduleStatusResult != "ACTIVE") {
      connection.release();
      return errResponse(baseResponse.SCHEDULE_STATUS_INACTIVE);
    }

    const editScheduleStatusResult = await scheduleDao.updateScheduleStatus(connection, scheduleIdx);
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR); // baseResponse.DB_ERROR
  } finally {
  }
};
