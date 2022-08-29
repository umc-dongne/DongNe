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

  

// 그룹 리스트 조회 - API NO. 5.1
const selectGroupList = async (connection, groupListPagingParams) => {
  const selectGroupListQuery = `
    SELECT
    GroupList.groupIdx,
    groupName,
    groupCategory
    FROM GroupList
    JOIN GroupMembers
    ON GroupList.groupIdx = GroupMembers.groupIdx
    WHERE GroupList.adminIdx = ? and GroupList.status = "ACTIVE" and GroupMembers.userIdx = ? and GroupMembers.status = "ACTIVE"
    LIMIT ?, ?     
      `;

  const [groupListRows] = await connection.query(selectGroupListQuery, groupListPagingParams);

  return groupListRows;
};

// API NO. 5.1 - Paging's Total Data Count with GroupList
const selectTotalDataCount = async (connection, totalDataCountParams) => {
  const selectTotalDataCountQuery = `
    SELECT COUNT(adminIdx) as totalDataCount
    FROM GroupList
    JOIN GroupMembers
    ON GroupList.groupIdx = GroupMembers.groupIdx
    WHERE adminIdx = ? and GroupMembers.userIdx = ? and GroupList.status = "ACTIVE" and GroupMembers.status = "ACTIVE";
      `;

  const [totalDataCountRows] = await connection.query(selectTotalDataCountQuery, totalDataCountParams);

  return totalDataCountRows;
};

// API NO. 5.1 - Validation Check's adminIdx Status
const selectAdminIdxStatus = async (connection, adminIdxStatusParams) => {
  const selectAdminIdxStatusQuery = `
    SELECT status
    FROM ClubMembers
    WHERE adminIdx = ? and userIdx = ?;
      `;

  const [adminIdxStatusRows] = await connection.query(selectAdminIdxStatusQuery, adminIdxStatusParams);

  return adminIdxStatusRows;
};

// 그룹 이름, 내용 조회 - API NO. 5.2 -> Part 1
const selectGroupInfo = async (connection, groupIdx) => {
  const selectGroupInfoQuery = `
    SELECT 
    groupName,
    groupIntroduction,
    groupCategory
    FROM GroupList
    WHERE groupIdx = ? and status = "ACTIVE";       
      `;

  const [groupInfoRows] = await connection.query(selectGroupInfoQuery, groupIdx);

  return groupInfoRows;
};

// API NO. 5.2 -> Part 1 - Validation Check's groupIdx Status
const selectGroupIdxStatus = async (connection, groupIdxStatusParams) => {
  const selectGroupIdxQuery = `
    SELECT
    GroupList.status as GroupListStatus,
    GroupMembers.Status as GroupMembersStatus
    FROM GroupList
    JOIN GroupMembers
    ON GroupList.groupIdx = GroupMembers.groupIdx
    WHERE GroupList.groupIdx = ? and GroupList.adminIdx = ? and GroupMembers.userIdx = ?;
      `;

  const [groupIdxStatusRows] = await connection.query(selectGroupIdxQuery, groupIdxStatusParams);

  return groupIdxStatusRows;
};


// 그룹 소속회원 조회 - API NO. 5.2 -> Part 2
const selectGroupMembers = async (connection, groupMembersPagingParams) => {

  const selectGroupMembersQuery = `
    SELECT
    User.userIdx,
    name,
    school,
    ClubTeamList.teamName,
    userImgUrl
    FROM GroupMembers as g
    JOIN User
    ON g.userIdx = User.userIdx
    JOIN ClubMembers as c
    on g.userIdx = c.userIdx
    JOIN ClubTeamList
    on c.clubTeamListIdx = ClubTeamList.clubTeamListIdx
    WHERE groupIdx = ? and c.adminIdx = ? and User.status = "ACTIVE" and g.status = "ACTIVE" and c.status = "ACTIVE"
    LIMIT ?, ?;
      `;

  const [groupMembersRows] = await connection.query(selectGroupMembersQuery, groupMembersPagingParams);

  return groupMembersRows;
};

// API NO. 5.2 - Paging's Total Data Count with GroupMembers
const selectGroupMembersTotalDataCount = async (connection, totalDataCountParams) => {
  const selectTotalDataCountQuery = `
    SELECT COUNT(groupIdx) as totalDataCount
    FROM GroupMembers
    JOIN ClubMembers
    ON GroupMembers.userIdx = ClubMembers.userIdx
    JOIN User
    ON GroupMembers.userIdx = User.userIdx
    WHERE groupIdx = ? and adminIdx = ? and GroupMembers.status = "ACTIVE" and ClubMembers.status = "ACTIVE" and User.status = "ACTIVE";
      `;

  const [totalDataCountRows] = await connection.query(selectTotalDataCountQuery, totalDataCountParams);

  return totalDataCountRows;
};

// API NO. 5.2 - select AdminIdx
const selectAdminIdx = async (connection, groupIdx) => {
  const selectAdminIdxQuery = `
    SELECT 
    adminIdx
    FROM GroupList
    WHERE groupIdx = ?      
      `;

  const [groupInfoRows] = await connection.query(selectAdminIdxQuery, groupIdx);

  return groupInfoRows;
};



  module.exports = { 
    selectUserPosts,
    selectGroupList,
    selectGroupInfo,
    selectGroupMembers,
    selectGroupMembersTotalDataCount,
    selectAdminIdx,
    selectTotalDataCount,
    selectAdminIdxStatus,
    selectGroupIdxStatus




    

  };