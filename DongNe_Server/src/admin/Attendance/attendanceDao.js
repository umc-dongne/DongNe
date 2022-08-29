// 출결 만들기
async function insertAttendance(connection, insertAttendanceParams) {
  const insertAttendanceQuery = `
  INSERT INTO Attendance(userIdx, scheduleIdx, attendanceStatus, createdAt, updatedAt, status)
  VALUES (?,?, 0, DEFAULT, DEFAULT, DEFAULT);
  `;
  const [insertAttendRows] = await connection.query(insertAttendanceQuery, insertAttendanceParams);
  return insertAttendRows;
}

// 출석한 회원 수 조회
async function countAttendList(connection, scheduleIdx) {
  const countAttendListQuery = `
  SELECT COUNT(*) as count
  FROM User u
    right join (SELECT userIdx
               FROM Attendance
               WHERE scheduleIdx =? and status = 'ACTIVE' and attendanceStatus=1) p on p.userIdx = u.userIdx
    right join GroupMembers on GroupMembers.userIdx = p.userIdx
    right join ClubMembers on ClubMembers.userIdx = GroupMembers.userIdx
  WHERE GroupMembers.groupIdx = ? and ClubMembers.adminIdx = ? and u.status = 'ACTIVE' and GroupMembers.status = "ACTIVE" and ClubMembers.status = "ACTIVE";


  `;

  const [countAttendRows] = await connection.query(countAttendListQuery, scheduleIdx);
  return countAttendRows;
}

// 출석한 회원 조회
async function selectAttendList(connection, selectAttendParams) {
  const selectAttendListQuery = `
    SELECT User.userIdx, User.name, teamName
    FROM Attendance
    JOIN User
    ON Attendance.userIdx = User.userIdx
    JOIN GroupMembers
    ON GroupMembers.userIdx = Attendance.userIdx
    JOIN ClubMembers
    ON ClubMembers.userIdx = GroupMembers.userIdx
    JOIN ClubTeamList
    ON ClubTeamList.clubTeamListIdx = ClubMembers.clubTeamListIdx
    WHERE Attendance.scheduleIdx = ? and attendanceStatus = 1 and GroupMembers.groupIdx = ? and ClubMembers.adminIdx = ? and  Attendance.status = 'ACTIVE'
    and User.status = "ACTIVE" and ClubMembers.status = "ACTIVE" and GroupMembers.status = "ACTIVE"
    LIMIT ?, ?;
    `;

  const [attendRows] = await connection.query(selectAttendListQuery, selectAttendParams);
  return attendRows;
}

// 결석한 회원수 조회
async function countAbsenceList(connection, scheduleIdx) {
  const countAbsenceListQuery = `
  SELECT COUNT(*) as count
  FROM User u
    right join (SELECT userIdx
               FROM Attendance
               WHERE scheduleIdx =? and status = 'ACTIVE' and attendanceStatus=0) p on p.userIdx = u.userIdx
    right join GroupMembers on GroupMembers.userIdx = p.userIdx
    right join ClubMembers on ClubMembers.userIdx = GroupMembers.userIdx
  WHERE GroupMembers.groupIdx = ? and ClubMembers.adminIdx = ? and u.status = 'ACTIVE' and GroupMembers.status = "ACTIVE" and ClubMembers.status = "ACTIVE";
  `;

  const [countAbsenceRows] = await connection.query(countAbsenceListQuery, scheduleIdx);
  return countAbsenceRows;
}

// 결석한 회원 조회
async function selectAbsenceList(connection, selectAbsenceParmas) {
  const selectAbsenceListQuery = `
    SELECT User.userIdx, User.name, teamName
    FROM Attendance
    JOIN User
    ON Attendance.userIdx = User.userIdx
    JOIN GroupMembers
    ON GroupMembers.userIdx = Attendance.userIdx
    JOIN ClubMembers
    ON ClubMembers.userIdx = GroupMembers.userIdx
    JOIN ClubTeamList
    ON ClubTeamList.clubTeamListIdx = ClubMembers.clubTeamListIdx
    WHERE Attendance.scheduleIdx = ? and attendanceStatus = 0 and GroupMembers.groupIdx = ? and ClubMembers.adminIdx = ? and  Attendance.status = 'ACTIVE'
    and User.status = "ACTIVE" and ClubMembers.status = "ACTIVE" and GroupMembers.status = "ACTIVE"
    LIMIT ?, ?;
    `;

  const [absenceRows] = await connection.query(selectAbsenceListQuery, selectAbsenceParmas);
  return absenceRows;
}

// 출결 코드 조회
async function selectAttendCode(connection, scheduleIdx) {
  const selectAttendCodeQuery = `
    SELECT attendanceCode
    FROM GroupSchedule
    WHERE scheduleIdx = ?;
    `;

  const [attendCode] = await connection.query(selectAttendCodeQuery, scheduleIdx);

  return attendCode;
}

// 출석 처리
async function updateAttendance(connection, attendParams) {
  const updateAttendanceQuery = `
  UPDATE Attendance
  SET attendanceStatus = 1
  WHERE scheduleIdx =? and userIdx = ?;  
  `;

  const [updateAttendRows] = await connection.query(updateAttendanceQuery, attendParams);
  return updateAttendRows;
}

// 결석 처리
async function updateAbsence(connection, absenceParams) {
  const updateAbsenceQuery = `
  UPDATE Attendance
  SET attendanceStatus = 0
  WHERE scheduleIdx =? and userIdx = ?;
  `;

  const [updateAbsenceRows] = await connection.query(updateAbsenceQuery, absenceParams);
  return updateAbsenceRows;
}

module.exports = {
  insertAttendance,
  selectAttendList,
  countAttendList,
  selectAbsenceList,
  countAbsenceList,
  selectAttendCode,
  updateAttendance,
  updateAbsence
};
