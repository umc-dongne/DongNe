const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const scheduleDao = require("./scheduleDao");

// paging 추가 ✅
exports.retrieveScheduleList = async function (groupIdx, userIdx, curPage, pageSize) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    // query params
    const selectScheduleParams = [groupIdx, userIdx];
    // group, user validation
    const existUserResult = await scheduleDao.selectExistUser(
      connection,
      selectScheduleParams
    );
    if (existUserResult[0].success == 0) {
      connection.release();
      return errResponse(baseResponse.GROUP_USERIDX_EXIST);
    }

    // paging
    const countScheduleResult = await scheduleDao.countSchedule(
      connection,
      selectScheduleParams
    );

    const totalSchedule = countScheduleResult[0].count; // 전체 스케줄 수
    if (totalSchedule < 0) {
      totalSchedule = 0;
    }
    const totalPage = Math.ceil(totalSchedule / pageSize); // 전체 페이지 수
    const offset = (curPage - 1) * pageSize; // 시작 번호

    // query param
    const scheduleListParmas = [groupIdx, userIdx, offset, pageSize];
    // select schedule
    const scheduleListResult = await scheduleDao.selectSchedule(
      connection,
      scheduleListParmas
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

exports.retrieveScheduleInfo = async function (scheduleIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const scheduleStatusResult = await scheduleDao.selectScheduleStatus(
      connection,
      scheduleIdx
    );
    // scheduleIdx status validation
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

exports.checkScheduleStatus = async function (scheduleIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  const scheduleStatusResult = await scheduleDao.selectScheduleStatus(
    connection,
    scheduleIdx
  );
  connection.release();

  return scheduleStatusResult[0].status;
};

exports.checkUserExist = async function (groupIdx, userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectExistParams = [groupIdx, userIdx];

  const userExistResult = await scheduleDao.selectExistUser(
    connection,
    selectExistParams
  );
  connection.release();

  return userExistResult[0].success;
};
