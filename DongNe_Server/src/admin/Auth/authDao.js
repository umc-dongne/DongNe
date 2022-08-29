//admin 이메일 조회
const selectAdminEmail = async (connection, email) => {
  const selectAdminEmailQuery = `
        SELECT adminEmail
        From Admin
        WHERE adminEmail =?
  `;
  const adminResult = await connection.query(selectAdminEmailQuery, [email]);
  return adminResult;
};

const selectAdminAccountByIdx = async (connection, adminIdx) => {
  const selectAdminEmailQuery = `
      SELECT status, adminIdx
      FROM Admin
      WHERE adminIdx = ?;
      `;
  const adminResult = await connection.query(selectAdminEmailQuery, [adminIdx]);
  return adminResult;
};

//admin 비밀번호 조회
const selectAdminPassword = async (connection, email) => {
  const selectUserPasswordQuery = `
      SELECT adminIdx, adminPwd
      FROM Admin
      WHERE adminEmail = ?;
  `;
  const selectUserPasswordRow = await connection.query(selectUserPasswordQuery, email);
  return selectUserPasswordRow;
};

//admin 계정 상태 확인
const selectAdminAccount = async (connection, email) => {
  const selectAdminAccountQuery = `
      SELECT status, adminIdx
      FROM Admin
      WHERE adminEmail = ?;

  `;
  const selectAdminAccountRow = await connection.query(selectAdminAccountQuery, email);
  return selectAdminAccountRow;
};

//admin 레코드 생성
const insertAdminInfo = async (connection, insertUserInfoParams) => {
  const insertUserQuery = `
  INSERT INTO Admin(clubName, adminEmail, adminPwd, establishmentYear, clubRegion,clubIntroduction,clubWebLink,clubImgUrl)
  VALUES (?, ?, ?, ?, ?, ?, ?,?);
  `;

  const insertUserInfoRow = await connection.query(insertUserQuery, insertUserInfoParams);
  return insertUserInfoRow;
};

const updateClubCode = async (connection, insertUserInfoParams) => {
  const insertUserQuery = `
        UPDATE Admin
        SET clubCode = ?
        WHERE adminIdx =?;  
  `;

  const insertUserInfoRow = await connection.query(insertUserQuery, insertUserInfoParams);
  return insertUserInfoRow;
};

module.exports = {
  selectAdminEmail,
  insertAdminInfo,
  selectAdminPassword,
  selectAdminAccount,
  selectAdminAccountByIdx,
  updateClubCode
};
