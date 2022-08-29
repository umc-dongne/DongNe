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

// 단체 모든 회원명단 리스트 조회 (SELECT) - API NO. 3.1
const selectClub = async (connection, clubMembersPagingParams) => {
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

    const [clubMemberRows] = await connection.query(selectClubMemberQuery, clubMembersPagingParams);
  
    return clubMemberRows;
  };

// API NO. 3.1 - Admin status (SELECT)
const selectClubStatus = async (connection, adminIdx) => {
  const selectClubStatusQuery = `
      SELECT status
      FROM Admin
      WHERE adminIdx = ?;
      `;

  const [clubStatusRows] = await connection.query(selectClubStatusQuery, adminIdx);

  return clubStatusRows;
};

// API NO. 3.1 - Paging's Total Data Count
const selectTotalDataCount = async (connection, adminIdx) => {
  const selectTotalDataCountQuery = `
    SELECT COUNT(adminIdx) as totalDataCount
    FROM ClubMembers
    JOIN User
    ON ClubMembers.userIdx = User.userIdx
    WHERE adminIdx = ? and ClubMembers.status ="ACTIVE" and User.status = "ACTIVE";
      `;

  const [totalDataCountRows] = await connection.query(selectTotalDataCountQuery, adminIdx);

  return totalDataCountRows;
};


// 회원 상세 조회 - API NO. 3.2
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

// API NO. 3.2 - User Status Check
const selectUserStatus = async (connection, userIdx) => {
  const selectUserStatusQuery = `
      SELECT status
      FROM User
      WHERE userIdx = ?;
      `;

  const [userStatusRows] = await connection.query(selectUserStatusQuery, userIdx);

  return userStatusRows;
};

// API NO. 3.2 - Token User with adminIdx Status Check
const selectTokenUserStatus = async (connection, TokenUserStatusParams) => {
  const selectTokenUserStatusQuery = `
      SELECT status
      FROM ClubMembers
      WHERE userIdx = ? and adminIdx = ?;
      `;

  const [tokenUserStatusRows] = await connection.query(selectTokenUserStatusQuery, TokenUserStatusParams);

  return tokenUserStatusRows;
};

// API NO. 3.2, API NO. 3.5 - Validation Check's member Status
const selectMemberStatus = async (connection, TokenUserStatusParams) => {
  const selectMemberStatusQuery = `
    SELECT
    ClubMembers.status,
    User.status as UserStatus
    FROM ClubMembers
    JOIN User
    ON User.userIdx = ClubMembers.userIdx
    WHERE ClubMembers.userIdx = ? and adminIdx = ?;
      `;

  const [tokenUserStatusRows] = await connection.query(selectMemberStatusQuery, TokenUserStatusParams);

  return tokenUserStatusRows;
};

// API NO. 3.2 - 동아리 팀/조 카테고리 리스트 조회
const selcetClubTeamList = async (connection, JWT_Token_adminIdx) => {
  const selectClubTeamListQuery = `
    SELECT
    clubTeamListIdx,
    teamName
    FROM ClubTeamList
    WHERE adminIdx = ? or adminIdx = 0 and status = "ACTIVE";
      `;

  const [clubTeamListRows] = await connection.query(selectClubTeamListQuery, JWT_Token_adminIdx);

  return clubTeamListRows;
};


// 회원 삭제 - API NO. 3.3
const editMember = async (connection, editMemberParams) => {
  const updateMemberQuery = `
    UPDATE ClubMembers
    SET status = "DELETED"
    WHERE userIdx = ? and adminIdx = ?;
      `;

  const [updateMemberRows] = await connection.query(updateMemberQuery, editMemberParams);

  return updateMemberRows;
};

// 동아리의 회원 팀/조 카테고리 추가 - API NO. 3.4
const createClubTeam = async (connection, createClubTeamParams) => {
  const insertClubTeamQuery = `
    INSERT INTO ClubTeamList (adminIdx, teamName)
    VALUE (?, ?);
      `;

  const [insertClubTeamRows] = await connection.query(insertClubTeamQuery, createClubTeamParams);

  return insertClubTeamRows;
};

// API NO. 3.5 Validation Check's clubTeamListIdx Status
const selectClubTeamListIdxStatus = async (connection, clubTeamListIdxStatusParams) => {
  const selectClubTeamListIdxStatusQuery = `
    SELECT status
    FROM ClubTeamList
    WHERE clubTeamListIdx = ? and adminIdx = ?;
      `;

  const [clubTeamListIdxStatusRows] = await connection.query(selectClubTeamListIdxStatusQuery, clubTeamListIdxStatusParams);

  return clubTeamListIdxStatusRows;
};

// 동아리 소속회원 팀/조 카테고리 적용 - API NO. 3.5
const updateMemberClubTeam = async (connection, updateMemberClubTeamParams) => {
  const updateMemberClubTeamQuery = `
    UPDATE ClubMembers
    SET clubTeamListIdx = ?
    WHERE userIdx = ? and adminIdx = ?;
      `;

  const [updateMemberClubTeamRows] = await connection.query(updateMemberClubTeamQuery, updateMemberClubTeamParams);

  return updateMemberClubTeamRows;
};

// 동아리 마이페이지 수정 - API NO. 3.6
const updateClubMypage = async (connection, editClubMypageParams) => {
  const updateMemberClubTeamQuery = `
    UPDATE Admin
    JOIN ClubCategory
    ON Admin.clubCategoryIdx = ClubCategory.clubCategoryIdx
    SET
    clubName = ?,
    establishmentYear = ?,
    clubRegion = ?,
    clubWebLink = ?,
    clubIntroduction = ?,
    Admin.clubCategoryIdx = ?
    WHERE adminIdx = ? and Admin.status = "ACTIVE"
      `;

  const [updateMemberClubTeamRows] = await connection.query(updateMemberClubTeamQuery, editClubMypageParams);

  return updateMemberClubTeamRows;
};

// 어드민의 동아리 메인 홈 정보 조회 - API NO. 3.7
const selectAdminMainhome = async (connection, adminMainpageParams) => {
  const selectAdminMainhomeQuery = `
    SELECT
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
    a.clubCode,
    c.categoryName
    FROM Admin as a
    JOIN ClubCategory as c
    ON c.clubCategoryIdx = a.clubCategoryIdx
    WHERE a.adminIdx = ? and a.status = "ACTIVE";
      `;

  const [AdminMainhomeRows] = await connection.query(selectAdminMainhomeQuery, adminMainpageParams);

  return AdminMainhomeRows;
};

// 어드민 동아리 마이페이지 정보 조회 - API NO. 3.8
const selectAdminMypageInfo = async (connection, adminIdx) => {
  const selectAdminMypageInfoQuery = `
    SELECT
    adminEmail,
    clubName,
    clubImgUrl,
    ClubCategory.clubCategoryIdx,
    ClubCategory.categoryName,
    establishmentYear,
    clubRegion,
    clubWebLink,
    clubIntroduction,
    Admin.updatedAt
    FROM Admin
    JOIN ClubCategory
    ON Admin.clubCategoryIdx = ClubCategory.clubCategoryIdx
    WHERE adminIdx = ? and Admin.status = "ACTIVE";
      `;

  const [AdminMypageInfoRows] = await connection.query(selectAdminMypageInfoQuery, adminIdx);

  return AdminMypageInfoRows;
};

// API NO. 3.8 - Retrieve Admin CategoryList
const selectAdminCategoryList = async (connection) => {
  const selectAdminCategoryListQuery = `
    SELECT
    clubCategoryIdx,
    categoryName
    FROM
    ClubCategory
    WHERE status = "ACTIVE";
      `;

  const [adminCategoryListRows] = await connection.query(selectAdminCategoryListQuery);

  return adminCategoryListRows;
};






  module.exports = 
  { selectUserPosts,
    selectClub,
    selectClubStatus,
    selectTotalDataCount,
    selectMemberInfo,
    selectUserStatus,
    selectTokenUserStatus,
    selectMemberStatus,
    editMember,
    createClubTeam,
    selectClubTeamListIdxStatus,
    updateMemberClubTeam,
    updateClubMypage,
    selectAdminMainhome,
    selectAdminMypageInfo,
    selectAdminCategoryList,
    selcetClubTeamList,
    
    
    

    
  };

  
  
