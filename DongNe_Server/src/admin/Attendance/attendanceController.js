const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const attendanceProvider = require("./attendanceProvider");
const attendanceService = require("./attendanceService");

/**
 * API No. 6.1
 * API Name : 출석한 회원 리스트 조회 API
 * [GET] admin/attendance?scheduleIdx=#&adminIdx=#&curPage=#&pageSize=#
 */
exports.getAttendance = async function (req, res) {
  // Query Params : scheduleIdx, adminIdx, curPage
  const { scheduleIdx, groupIdx, adminIdx, curPage } = req.query;
  const pageSize = parseInt(req.query.pageSize);

  // jwt : adminId
  const adminIdxFromJWT = req.verifiedToken.adminId;

  // adminIdx validation
  if (!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  } else if (adminIdx != adminIdxFromJWT) {
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }

  // admin validation
  // validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }

  // groupIdx Validation
  if (!groupIdx) {
    return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } else if (groupIdx <= 0) {
    return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }
  if (curPage <= 0) {
    curPage = 1;
  }
  if (!pageSize){
    return res.send(baseResponse.PAGING_PARAMS_EMPTY);
  }

  const attendListResult = await attendanceProvider.retrieveAttendList(
    scheduleIdx,
    groupIdx,
    adminIdx,
    curPage,
    pageSize
  );
  return res.send(attendListResult);
};

/**
 * API No. 6.2
 * API Name : 결석한 회원 리스트 조회 API
 * [GET] admin/attendance/absence?scheduleIdx=#&adminIdx=#&curPage=#
 */
exports.getAbsence = async function (req, res) {
  // Query Params : scheduleIdx, adminIdx, curPage
  const { scheduleIdx, adminIdx, groupIdx, curPage } = req.query;

  // jwt : adminId
  const adminIdxFromJWT = req.verifiedToken.adminId;
  const pageSize = parseInt(req.query.pageSize);


  // adminIdx validation
  if (!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  } else if (adminIdx != adminIdxFromJWT) {
    return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }

  // validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }

  // groupIdx Validation
  if (!groupIdx) {
    return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } else if (groupIdx <= 0) {
    return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }
  
  if (curPage <= 0) {
    curPage = 1;
  }
  if (!pageSize){
    return res.send(baseResponse.PAGING_PARAMS_EMPTY);
  }


  const absenceListResult = await attendanceProvider.retrieveAbsenceList(
    scheduleIdx,
    groupIdx,
    adminIdx,
    curPage,
    pageSize
  );
  return res.send(absenceListResult);
};

/**
 * API No. 6.3
 * API Name : 출석코드 API 조회
 * [GET] admin/attendance/code?scheduleIdx=#&adminIdx=#
 */
exports.getAttendCode = async function (req, res) {
  // Query Params : scheduleIdx, adminIdx, curPage
  const { scheduleIdx, adminIdx } = req.query;

  // jwt : adminId
  const adminIdxFromJWT = req.verifiedToken.adminId;

  // adminIdx validation
  if (!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  } else if (adminIdx != adminIdxFromJWT) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_NOT_MATCH));
  }

  // validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }

  const attendCodeResult = await attendanceProvider.retrieveAttendCode(
    scheduleIdx
  );

  return res.send(attendCodeResult);
};

/**
 * API No. 6.4
 * API Name : 회원 출석 처리 API
 * [PATCH] admin/attendance?scheduleIdx=#&adminIdx=#&userIdx=#
 */
exports.patchAttendacne = async function (req, res) {
  // Query Params : scheduleIdx, adminIdx, curPage
  const { scheduleIdx, adminIdx, userIdx } = req.query;

  // jwt : adminId
  const adminIdxFromJWT = req.verifiedToken.adminId;

  // adminIdx validation
  if (!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  } else if (adminIdx != adminIdxFromJWT) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_NOT_MATCH));
  }

  // validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }
  if (!userIdx) {
    return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
  } else if (userIdx <= 0) {
    return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
  }

  // response
  const patchAttendResult = await attendanceService.editAttendance(
    scheduleIdx,
    userIdx
  );
  return res.send(patchAttendResult);
};

/**
 * API No. 6.5
 * API Name : 회원 결석 처리 API
 * [PATCH] admin/attendance/absence?scheduleIdx=#&adminIdx=#&userIdx=#
 */
exports.patchAbsence = async function (req, res) {
  // Query Params : scheduleIdx, adminIdx, curPage
  const { scheduleIdx, adminIdx, userIdx } = req.query;

  // jwt : adminId
  const adminIdxFromJWT = req.verifiedToken.adminId;

  // adminIdx validation
  if (!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  } else if (adminIdx != adminIdxFromJWT) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_NOT_MATCH));
  }

  // validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }
  if (!userIdx) {
    return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
  } else if (userIdx <= 0) {
    return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
  }

  // response
  const patchAbsenceResult = await attendanceService.editAbsence(
    scheduleIdx,
    userIdx
  );
  return res.send(patchAbsenceResult);
};
