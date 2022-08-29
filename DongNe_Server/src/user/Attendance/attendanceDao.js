// 출결 코드 인증
async function insertAttendanceCode(connection, postAttendCodeParams) {
  const postAttendanceCodeQuery = `
  SELECT EXISTS(
    SELECT scheduleIdx
    FROM GroupSchedule
    WHERE status = 'ACTIVE' and attendanceCode = ? and scheduleIdx = ?
           ) as success;
    `;

  const [postScheduleRow] = await connection.query(
    postAttendanceCodeQuery,
    postAttendCodeParams
  );

  return postScheduleRow;
}

// 출결 수정
async function updateAttendance(connection, editAttendParams) {
  const updateAttendanceQuery = `
    UPDATE Attendance
    SET attendanceStatus = 1
    WHERE scheduleIdx =? and userIdx = ?;
    `;

  const [updateAttendRow] = await connection.query(
    updateAttendanceQuery,
    editAttendParams
  );
  return updateAttendRow;
}

// user 조회
async function checkUserStatus(connection, userIdx) {
  const checkUserStatusQuery = `
  SELECT status
  FROM User
  WHERE userIdx = ?;
  `;

  const [checkUserRow] = await connection.query(checkUserStatusQuery, userIdx);
  return checkUserRow;
}

module.exports = { insertAttendanceCode, updateAttendance, checkUserStatus };
