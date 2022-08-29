const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const scheduleDao = require("./scheduleDao");

// paging 추가 ✅
exports.retrieveScheduleList = async function (groupIdx, curPage, pageSize) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    const countScheduleResult = await scheduleDao.countSchedule(
      connection,
      groupIdx
    );
    
    const totalSchedule = countScheduleResult[0].count; // 전체 스케줄 개수
    // validation
    if (totalSchedule < 0) {
      totalSchedule = 0;
    }
    const totalPage = Math.ceil(totalSchedule / pageSize); // 전체 페이지 수
    const offset = (curPage - 1) * pageSize; // 시작 번호

    // query param
    const selectScheduleParmams = [groupIdx, offset, pageSize];
    // select schedule
    const scheduleListResult = await scheduleDao.selectSchedule(
      connection,
      selectScheduleParmams
    );
    connection.release();

    const result = {
      schedule: scheduleListResult,
      totalPage: totalPage,
      curPage: curPage,
    };
    return response(baseResponse.SUCCESS, result);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};

exports.checkScheduleStatus = async function (scheduleIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  const scheduleStatusResult = await scheduleDao.selectScheduleStatus(
    connection,
    scheduleIdx
  );
  connection.release();

  return scheduleStatusResult[0].status;
};

exports.retrieveScheduleInfo = async function (scheduleIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const scheduleStatusResult = await scheduleDao.selectScheduleStatus(
      connection,
      scheduleIdx
    );

    if (scheduleStatusResult[0].status != "ACTIVE") {
      connection.release();
      return errResponse(baseResponse.SCHEDULE_STATUS_INACTIVE);
    }

    const scheduleInfoResult = await scheduleDao.selectScheduleInfo(
      connection,
      scheduleIdx
    );
    connection.release();

    return response(baseResponse.SUCCESS, scheduleInfoResult);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};

// exports.functionName = async function (param) {
//     const connection = await pool.getConnection(async (conn) => conn);
//     connection.release();
//   };
