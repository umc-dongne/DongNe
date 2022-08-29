const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const attendanceDao = require("./attendanceDao");
const scheduleProvider = require("../Schedule/scheduleProvider");
const groupDao = require("../Group/groupDao");
const baseResponseStatus = require("../../../config/baseResponseStatus");

// paging 추가 ✅
exports.retrieveAttendList = async function (scheduleIdx, groupIdx, adminIdx, curPage, pageSize) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    // Validation Check's groupIdx Status (middle)
    const groupIdxStatusParams = [groupIdx, adminIdx];
    const groupIdxStatus = await groupDao.selectGroupIdxStatus(connection, groupIdxStatusParams);
    if (groupIdxStatus[groupIdxStatus.length - 1]?.status != "ACTIVE"){
      return errResponse(baseResponseStatus.ADMIN_GROUPIDX_STATUS);
    }

    const countAttendParams = [scheduleIdx, groupIdx, adminIdx];
    const countAttnedResult = await attendanceDao.countAttendList(
      connection,
      countAttendParams
    );
    const totalAttend = countAttnedResult[0].count; // 전체 출석한 회원 수
    const totalPage = Math.ceil(totalAttend / pageSize); // 전체 페이지 수
    const offset = (curPage - 1) * pageSize; // 시작 번호
    
    // query param
    const selectAttendParams = [scheduleIdx, groupIdx, adminIdx, offset, pageSize];
    // select attendance
    const attendListResult = await attendanceDao.selectAttendList(
      connection,
      selectAttendParams
    );
    connection.release();

    // result
    const result = {
      attendList: attendListResult,
      totalPage: totalPage,
      curPage: curPage,
    };
    return response(baseResponse.SUCCESS, result);
  } catch (err) {
    console.log(err.response);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};

// paging 추가 ✅
exports.retrieveAbsenceList = async function (scheduleIdx, groupIdx, adminIdx, curPage, pageSize) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    
    // Validation Check's groupIdx Status (middle)
    const groupIdxStatusParams = [groupIdx, adminIdx];
    const groupIdxStatus = await groupDao.selectGroupIdxStatus(connection, groupIdxStatusParams);
    if (groupIdxStatus[groupIdxStatus.length - 1]?.status != "ACTIVE"){
      return errResponse(baseResponseStatus.ADMIN_GROUPIDX_STATUS);
    }

    const countAbsenceParams = [scheduleIdx, groupIdx, adminIdx];
    const countAbsenceResult = await attendanceDao.countAbsenceList(
      connection,
      countAbsenceParams
    );
    const totalAbsence = countAbsenceResult[0].count; // 전체 결석한 회원 수
    const totalPage = Math.ceil(totalAbsence / pageSize); // 전체 페이지 수
    const offset = (curPage - 1) * pageSize;

    //query param
    const selectAbsenceParmas = [scheduleIdx, groupIdx, adminIdx, offset, pageSize];
    // select AbsenceLisrt
    const absenceListResult = await attendanceDao.selectAbsenceList(
      connection,
      selectAbsenceParmas
    );
    connection.release();

    // result
    const result = {
      absenceList: absenceListResult,
      totalPage: totalPage,
      curPage: curPage,
    };
    return response(baseResponse.SUCCESS, result);
  } catch (err) {
    console.log(err.response);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};

exports.retrieveAttendCode = async function (scheduleIdx) {
  try {
    // check Active
    const scheduleStatusResult = await scheduleProvider.checkScheduleStatus(
      scheduleIdx
    );
    if (scheduleStatusResult != "ACTIVE") {
      return errResponse(baseResponse.SCHEDULE_STATUS_INACTIVE);
    }

    const connection = await pool.getConnection(async (conn) => conn);
    const attendCodeResult = await attendanceDao.selectAttendCode(
      connection,
      scheduleIdx
    );
    connection.release();

    return response(baseResponse.SUCCESS, attendCodeResult[0].attendanceCode);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};
