// DB Test
const selectUserPosts = async (connection) => {
    const selectTestUserQuery = `
          SELECT *
          FROM User
          ;
        `;
    const [testResult] = await connection.query(selectTestUserQuery);
  
    return testResult;
  };

// 단체 모든 회원명단 리스트 조회 (SELECT) - API NO. 4.1
const selectClub = async (connection, clubMemberParams) => {
    const selectClubMemberQuery = `
    SELECT
    User.userIdx,
    name,
    userImgUrl,
    teamName
    FROM ClubMembers
    JOIN User
    ON ClubMembers.userIdx = User.userIdx
    JOIN ClubTeamList
    ON ClubMembers.clubTeamListIdx = ClubTeamList.clubTeamListIdx
    WHERE ClubMembers.adminIdx = ? and User.status = "ACTIVE" and ClubMembers.status = "ACTIVE"
    LIMIT ?, ?;
        `;

    const [clubMemberRows] = await connection.query(selectClubMemberQuery, clubMemberParams);
  
    return clubMemberRows;
  };

// API NO. 4.1 - Admin status (SELECT)
const selectClubStatus = async (connection, adminIdx) => {
  const selectClubStatusQuery = `
      SELECT status
      FROM Admin
      WHERE adminIdx = ?;
      `;

  const [clubStatusRows] = await connection.query(selectClubStatusQuery, adminIdx);

  return clubStatusRows;
};

// API NO. 4.1 - Paging's Total Data Count
const selectTotalDataCount = async (connection, adminIdx) => {
  const selectTotalDataCountQuery = `
    SELECT COUNT(adminIdx) as totalDataCount
    FROM ClubMembers
    JOIN User
    ON ClubMembers.userIdx = User.userIdx
    WHERE adminIdx = ? and ClubMembers.status = "ACTIVE" and User.status = "ACTIVE";
      `;

  const [totalDataCountRows] = await connection.query(selectTotalDataCountQuery, adminIdx);

  return totalDataCountRows;
};

// API NO. 4.1 - Validation Check's adminIdx Status
const selectAdminIdxStatus = async (connection, adminIdxStatusParams) => {
  const selectAdminIdxStatusQuery = `
    SELECT status
    FROM ClubMembers
    WHERE adminIdx = ? and userIdx = ?;
      `;

  const [adminIdxStatusRows] = await connection.query(selectAdminIdxStatusQuery, adminIdxStatusParams);

  return adminIdxStatusRows;
};

// 회원 상세 조회 - API NO. 4.2
const selectMemberInfo = async (connection, memberInfoParams) => {
  const selectMemberInfoQuery = `
    SELECT
    name,
    phoneNum,
    school,
    birth,
    address,
    introduction,
    teamName
    FROM User
    JOIN ClubMembers
    ON ClubMembers.userIdx = User.userIdx
    JOIN ClubTeamList
    ON ClubMembers.clubTeamListIdx = ClubTeamList.clubTeamListIdx
    WHERE User.userIdx = ? and ClubMembers.adminIdx = ?;
      `;

  const [memberInfoRows] = await connection.query(selectMemberInfoQuery, memberInfoParams);

  return memberInfoRows;
};

// API NO. 4.2 - User Status Check
const selectUserStatus = async (connection, userIdx) => {
  const selectUserStatusQuery = `
      SELECT status
      FROM User
      WHERE userIdx = ?;
      `;

  const [userStatusRows] = await connection.query(selectUserStatusQuery, userIdx);

  return userStatusRows;
};

// API NO. 4.2 - Validation Check's retrieveUserIdx Status
const selectRetrieveUserIdxStatus = async (connection, retrieveUserIdxStatusParams) => {
  const selectRetrieveUserIdxStatusQuery = `
      SELECT status
      FROM ClubMembers
      WHERE adminIdx = ? and userIdx = ?;
      `;

  const [userStatusRows] = await connection.query(selectRetrieveUserIdxStatusQuery, retrieveUserIdxStatusParams);

  return userStatusRows;
};


// 회원의 소속 동아리 리스트 조회 - API NO. 4.3
const selectClubList = async (connection, userIdx) => {
  const selectClubListQuery = `
    SELECT
    Admin.adminIdx,
    clubName
    FROM ClubMembers
    JOIN Admin
    ON ClubMembers.adminIdx = Admin.adminIdx
    WHERE userIdx = ? and ClubMembers.status = "ACTIVE";
      `;

  const [clubListRows] = await connection.query(selectClubListQuery, userIdx);

  return clubListRows;
};

// API NO. 4.3 - Validation Check's User Status
const selectRetrieveUserStatus = async (connection, userIdx) => {
  const selectRetrieveUserStatusQuery = `
      SELECT status
      FROM User
      WHERE userIdx = ?;
      `;

  const [userStatusRows] = await connection.query(selectRetrieveUserStatusQuery, userIdx);

  return userStatusRows;
};

// API NO. 4.3 - Retrieve UserName
const selcetUserName = async (connection, userIdx) => {
  const selectUserNameQuery = `
    SELECT name
    FROM User
    WHERE userIdx = ?;
      `;

  const [userStatusRows] = await connection.query(selectUserNameQuery, userIdx);

  return userStatusRows;
};



// 개인 회원의 마이페이지 수정 - API NO. 4.4
const updateUserMypageClub = async (connection, editUserMypageParams) => {
  const updateUserMypageParamsQuery = `
    UPDATE User
    SET
    name = ?,
    school = ?,
    phoneNum = ?,
    birth = ?,
    address = ?,
    introduction = ?
    WHERE userIdx = ?;
      `;

  const [userStatusRows] = await connection.query(updateUserMypageParamsQuery, editUserMypageParams);

  return userStatusRows;
};

// 회원의 동아리 메인 홈 정보 조회 - API NO. 4.5
const selectMemberMainhome = async (connection, memberMainpageParams) => {
  const selectMainhomeQuery = `
    SELECT
    name,
    introduction,
    a.ClubName,
      (SELECT
      count(ClubMembers.userIdx) as clubMemberCount
      FROM ClubMembers
    JOIN User
    on ClubMembers.userIdx = User.userIdx
    WHERE adminIdx = ? and ClubMembers.status = "ACTIVE" and User.status = "ACTIVE" ) as clubMemberCount,
    a.establishmentYear,
    a.clubRegion,
    a.clubWebLink,
    a.clubIntroduction,
    c.categoryName
    FROM User
    JOIN ClubMembers
    ON ClubMembers.userIdx = User.userIdx
    JOIN Admin as a
    ON a.adminIdx = ClubMembers.adminIdx
    JOIN ClubCategory as c
    ON c.clubCategoryIdx = a.clubCategoryIdx
    WHERE ClubMembers.userIdx = ? and ClubMembers.adminIdx = ? and ClubMembers.status = "ACTIVE" and User.status = "ACTIVE";
      `;

  const [memberMainhomeRows] = await connection.query(selectMainhomeQuery, memberMainpageParams);

  return memberMainhomeRows;
};

// 회원의 마이페이지 정보 조회 - API NO. 4.6
const selectUserMypageInfo = async (connection, userIdx) => {
  const selectUserMypageInfoQuery = `
    SELECT
    userEmail,
    name,
    userImgUrl,
    school,
    phoneNum,
    birth,
    address,
    introduction,
    updatedAt
    FROM User
    WHERE userIdx = ? and status = "ACTIVE";
      `;

  const [userMypageInfoRows] = await connection.query(selectUserMypageInfoQuery, userIdx);

  return userMypageInfoRows;
};








  module.exports = 
  { selectUserPosts,
    selectClub,
    selectClubStatus,
    selectMemberInfo,
    selectUserStatus,
    selectTotalDataCount,
    selectAdminIdxStatus,
    selectRetrieveUserIdxStatus,
    selectRetrieveUserStatus,
    selectClubList,
    updateUserMypageClub,
    selectMemberMainhome,
    selectUserMypageInfo,
    selcetUserName,
    

    



    
  };

  
  
