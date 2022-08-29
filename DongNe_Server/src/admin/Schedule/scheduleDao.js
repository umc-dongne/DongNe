// schedule 생성
async function insertSchedule(connection, insertScheduleParams) {
  const insertScheduleQuery = `
  INSERT INTO GroupSchedule(groupIdx, scheduleDate, attendanceCode, init_time, end_time, introduction, place, scheduleName)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const [insertScheduleRow] = await connection.query(
    insertScheduleQuery,
    insertScheduleParams
  );

  return insertScheduleRow;
}

// groupIdx에 속한 user 조회
async function selectUser(connection, groupIdx) {
  const selectUserQuery = `
  SELECT userIdx
  FROM GroupMembers
  WHERE groupIdx = ?;
  `;
  const [userRows] = await connection.query(selectUserQuery, groupIdx);
  return userRows;
}

// groupIdx로 schedule 리스트 조회
async function selectSchedule(connection, selectScheduleParmams) {
  const selectScheduleQuery = `
  SELECT GS.scheduleIdx, GS.scheduleName, DATE_FORMAT(GS.scheduleDate, '%Y-%m-%d') as scheduleDate, p.groupName
  FROM GroupSchedule as GS
    left join (SELECT groupIdx, groupName
        FROM GroupList
        WHERE status='ACTIVE') p on p.groupIdx = GS.groupIdx
  WHERE GS.status='ACTIVE' and GS.groupIdx=?
  ORDER BY GS.createdAt
  LIMIT ?, ?;
  `;

  const [scheduleRows] = await connection.query(
    selectScheduleQuery,
    selectScheduleParmams
  );
  return scheduleRows;
}

// groupIdx로 schedule 개수 조회
async function countSchedule(connection, groupIdx) {
  const countScheduleQuery = `
  SELECT COUNT(*) as count
  FROM GroupSchedule as GS
      left join (SELECT groupIdx
          FROM GroupList
          WHERE status='ACTIVE') p on p.groupIdx = GS.groupIdx
  WHERE GS.status='ACTIVE' and GS.groupIdx=?;
  `;

  const [countScheduleRow] = await connection.query(
    countScheduleQuery,
    groupIdx
  );
  return countScheduleRow;
}

// scheduleIdx 상태 체크
async function selectScheduleStatus(connection, scheduleIdx) {
  const selectScheduleStatusQuery = `
    SELECT status
    From GroupSchedule
    WHERE scheduleIdx=?;`;

  const [scheduleStatus] = await connection.query(
    selectScheduleStatusQuery,
    scheduleIdx
  );
  return scheduleStatus;
}

// scheduleIdx로 schedule 상세 조회
async function selectScheduleInfo(connection, scheduleIdx) {
  const selectScheduleInfoQuery = `
  SELECT scheduleIdx, DATE_FORMAT(scheduleDate, '%Y-%m-%d') as scheduleDate, attendanceCode, DATE_FORMAT(init_time, '%Y-%m-%d %T') as init_time, DATE_FORMAT(end_time, '%Y-%m-%d %T') as end_time, introduction, place, scheduleName, etc
  FROM GroupSchedule
  WHERE status='ACTIVE' and scheduleIdx=?;
    `;

  const [scheduleInfo] = await connection.query(
    selectScheduleInfoQuery,
    scheduleIdx
  );
  return scheduleInfo;
}

// 스케줄 삭제
async function updateScheduleStatus(connection, scheduleIdx) {
  const updateScheduleStatusQuery = `
    UPDATE GroupSchedule
    SET status = 'INACTIVE'
    WHERE scheduleIdx = ?;`;

  const [updateScheduleStatusRow] = await connection.query(
    updateScheduleStatusQuery,
    scheduleIdx
  );
  return updateScheduleStatusRow;
}

/**
 * 스케줄 수정
 * date, init_time, end_time, introduction, place, schedulename
 */

async function updateScheduleDate(connection, editDateParams) {
  const updateScheduleDateQuery = `
  UPDATE GroupSchedule
  SET scheduleDate =?
  WHERE scheduleIdx =?;
  `;

  const [updateScheduleDateRow] = await connection.query(
    updateScheduleDateQuery,
    editDateParams
  );
  return updateScheduleDateRow;
}

async function updateScheduleInitTime(connection, editInitTimeParams) {
  const updateScheduleInitTimeQuery = `
  UPDATE GroupSchedule
  SET init_time =?
  WHERE scheduleIdx =?;
  `;

  const [updateScheduleInitTimeRow] = await connection.query(
    updateScheduleInitTimeQuery,
    editInitTimeParams
  );

  return updateScheduleInitTimeRow;
}

async function updateScheduleEndTime(connection, editEndTimeParams) {
  const updateScheduleEndTimeQuery = `
  UPDATE GroupSchedule
  SET end_time =?
  WHERE scheduleIdx =?;
  `;

  const [updateScheduleEndTimeRow] = await connection.query(
    updateScheduleEndTimeQuery,
    editEndTimeParams
  );

  return updateScheduleEndTimeRow;
}

async function updateScheduleIntro(connection, editIntroParams) {
  const updateScheduleIntroQuery = `
  UPDATE GroupSchedule
  SET introduction =?
  WHERE scheduleIdx =?;
  `;

  const [updateScheduleIntroRow] = await connection.query(
    updateScheduleIntroQuery,
    editIntroParams
  );

  return updateScheduleIntroRow;
}

async function updateSchedulePlace(connection, editPlaceParams) {
  const updateSchedulePlaceQuery = `
  UPDATE GroupSchedule
  SET place =?
  WHERE scheduleIdx =?;
  `;

  const [updateSchedulePlaceRow] = await connection.query(
    updateSchedulePlaceQuery,
    editPlaceParams
  );

  return updateSchedulePlaceRow;
}

async function updateScheduleName(connection, editNameParams) {
  const updateScheduleNameQuery = `
  UPDATE GroupSchedule
  SET scheduleName =?
  WHERE scheduleIdx =?;
  `;

  const [updateScheduleNameRow] = await connection.query(
    updateScheduleNameQuery,
    editNameParams
  );

  return updateScheduleNameRow;
}

async function updateScheduleCode(connection, editCodeParams) {
  const updateScheduleCodeQuery = `
  UPDATE GroupSchedule
  SET attendanceCode =?
  WHERE scheduleIdx =?;
  `;

  const [updateScheduleCodeRow] = await connection.query(
    updateScheduleCodeQuery,
    editCodeParams
  );

  return updateScheduleCodeRow;
}

async function updateScheduleEtc(connection, editEtcParams) {
  const updateScheduleEtcQuery = `
  UPDATE GroupSchedule
  SET etc =?
  WHERE scheduleIdx =?;
  `;

  const [updateScheduleEtcRow] = await connection.query(
    updateScheduleEtcQuery,
    editEtcParams
  );

  return updateScheduleEtcRow;
}

module.exports = {
  insertSchedule,
  selectUser,
  selectSchedule,
  countSchedule,
  selectScheduleInfo,
  selectScheduleStatus,
  updateScheduleStatus,
  updateScheduleDate,
  updateScheduleInitTime,
  updateScheduleEndTime,
  updateScheduleIntro,
  updateSchedulePlace,
  updateScheduleName,
  updateScheduleCode,
  updateScheduleEtc,
};
