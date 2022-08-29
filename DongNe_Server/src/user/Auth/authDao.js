//admin 이메일 조회
const selectUserEmail = async (connection, email) => {
  const selectUserEmailQuery = `
        SELECT userEmail
        From User
        WHERE userEmail =?
  `;
  const userEmailResult = await connection.query(selectUserEmailQuery, [email]);
  return userEmailResult;
};

//user 비밀번호 조회
const selectUserPassword = async (connection, email) => {
  const selectUserPasswordQuery = `
      SELECT userIdx, password
      FROM User
      WHERE userEmail = ?;
  `;
  const selectUserPasswordRow = await connection.query(selectUserPasswordQuery, email);
  return selectUserPasswordRow;
};

//admin 계정 상태 확인
const selectUserAccount = async (connection, email) => {
  const selectUserAccountQuery = `
      SELECT status, userIdx
      FROM User
      WHERE userEmail = ?;

  `;
  const selectUserAccountRow = await connection.query(selectUserAccountQuery, email);
  return selectUserAccountRow;
};

//user 레코드 생성
const insertUserInfo = async (connection, insertUserInfoParams) => {
  const insertUserQuery = `
  INSERT INTO User(name, userEmail, password, phoneNum, school, birth, address, introduction, userImgUrl)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const insertUserInfoRow = await connection.query(insertUserQuery, insertUserInfoParams);
  return insertUserInfoRow;
};

// 유저 동아리 가입
const userJoinClub = async (connection, memberInfoParams) => {
  const insertMemberQuery = `
  INSERT INTO ClubMembers(userIdx,adminIdx)
  VALUES (?, ?);
  `;

  const userJoinClubRow = await connection.query(insertMemberQuery, memberInfoParams);
  return userJoinClubRow;
};

// 동아리에 이미 가입한 회원인지 조회
const selectMember = async (connection, memberInfoParams) => {
  const selectMemberQuery = `
        SELECT memIdx
        FROM ClubMembers
        WHERE userIdx = ? and adminIdx = ?
  `;

  const selectMemberInfoRow = await connection.query(selectMemberQuery, memberInfoParams);
  return selectMemberInfoRow;
};

const selectAdminAccountByIdx = async (connection, adminIdx) => {
  const selectAdminAccountByIdxQuery = `
      SELECT status
      FROM Admin
      WHERE adminIdx = ?;
      `;
  const [adminResult] = await connection.query(selectAdminAccountByIdxQuery, [adminIdx]);
  return adminResult;
};

const selectUserStatus = async (connection, userIdx) => {
  const selectUserStatusQuery = `
      SELECT status
      FROM User
      WHERE userIdx = ?;
      `;

  const [selectUserStatusRows] = await connection.query(selectUserStatusQuery, userIdx);

  return selectUserStatusRows;
};

module.exports = {
  selectUserEmail,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  userJoinClub,
  selectMember,
  selectAdminAccountByIdx,
  selectUserStatus
};
