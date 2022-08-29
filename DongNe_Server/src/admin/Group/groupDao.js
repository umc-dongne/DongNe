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
  
// 그룹 추가 / Group Create - API NO. 4.1
async function insertGroup(connection, insertGroupParams){
  const insertGroupQuery = `
  INSERT INTO GroupList(adminIdx, groupName, groupIntroduction, groupCategory)
  VALUES (?, ?, ?, ?);
  `;

  const insertGroupRow = await connection.query(insertGroupQuery, insertGroupParams);

  return insertGroupRow;
};

// 그룹 추가 / Group Members add - API NO. 4.1 , API NO. 4.3 -> Part 3
async function insertGroupMembers(connection, insertGroupMemberParams){
  const insertGroupMemberQuery = `
  INSERT INTO GroupMembers(userIdx, groupIdx)
  VALUES (?, ?);
  `;

  const insertGroupMemberRow = await connection.query(insertGroupMemberQuery, insertGroupMemberParams);

  return insertGroupMemberRow;
};

// API NO. 4.1 - Validation Check's members Status
const selectMembersStatus = async (connection, membersStatusParams) => {
  const selectMembersStatusQuery = `
    SELECT
    ClubMembers.status,
    User.status as UserStatus
    FROM ClubMembers
    JOIN User
    ON User.userIdx = ClubMembers.userIdx
    WHERE ClubMembers.userIdx = ? and adminIdx = ?;
      `;

  const [membersStatusRows] = await connection.query(selectMembersStatusQuery, membersStatusParams);

  return membersStatusRows;
};

// 그룹 리스트 조회 - API NO. 4.2
const selectGroupList = async (connection, groupListPagingParams) => {
  const selectGroupListQuery = `
  SELECT
  groupIdx,
  groupName,
  groupCategory
  FROM GroupList
  WHERE adminIdx = ? and status = "ACTIVE"
  LIMIT ?, ?;
      `;

  const [groupListRows] = await connection.query(selectGroupListQuery, groupListPagingParams);

  return groupListRows;
};

// API NO. 4.2 - Paging's Total Data Count with GroupList
const selectTotalDataCount = async (connection, adminIdx) => {
  const selectTotalDataCountQuery = `
    SELECT COUNT(adminIdx) as totalDataCount
    FROM GroupList
    WHERE adminIdx = ? and status = "ACTIVE";
      `;

  const [totalDataCountRows] = await connection.query(selectTotalDataCountQuery, adminIdx);

  return totalDataCountRows;
};

// 그룹 이름, 내용 조회 - API NO. 4.3 -> Part 1
const selectGroupInfo = async (connection, groupIdx) => {
  const selectGroupInfoQuery = `
    SELECT 
    groupName,
    groupIntroduction,
    groupCategory
    FROM GroupList
    WHERE groupIdx = ? and status = "ACTIVE"       
      `;

  const [groupInfoRows] = await connection.query(selectGroupInfoQuery, groupIdx);

  return groupInfoRows;
};

// API NO. 4.3 -> Part 1 - Validation Check's groupIdx Status
const selectGroupIdxStatus = async (connection, groupIdxStatusParams) => {
  const selectGroupIdxStatusQuery = `
    SELECT
    status
    FROM GroupList
    WHERE groupIdx = ? and adminIdx = ?;
      `;

  const [groupIdxStatusRows] = await connection.query(selectGroupIdxStatusQuery, groupIdxStatusParams);

  return groupIdxStatusRows;
};


// 그룹 소속회원 조회 - API NO. 4.3 -> Part 2
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

// API NO. 4.3 -> Part 2 - Paging's Total Data Count with GroupMembers
const selectGroupMembersTotalDataCount = async (connection, totalDataCountParams) => {
  const selectTotalDataCountQuery = `
    SELECT COUNT(groupIdx) as totalDataCount
    FROM GroupMembers
    JOIN ClubMembers
    ON GroupMembers.userIdx = ClubMembers.userIdx
    WHERE groupIdx = ? and GroupMembers.status = "ACTIVE" and ClubMembers.status = "ACTIVE" and adminIdx = ?;
      `;

  const [totalDataCountRows] = await connection.query(selectTotalDataCountQuery, totalDataCountParams);

  return totalDataCountRows;
};

// API NO. 4.3 -> Part 2 - select AdminIdx
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

// 그룹 이름, 내용 수정 - API NO. 4.4 -> Part 1
const editGroupInfo = async (connection, editGroupInfoParams) => {

  const updateGroupInfoQuery = `
    UPDATE GroupList
    SET groupName = ? , groupIntroduction = ? , groupCategory = ?
    WHERE groupIdx = ?;
      `;

  const [updateGroupInfoRows] = await connection.query(updateGroupInfoQuery, editGroupInfoParams);
  return updateGroupInfoRows;
};

// 그룹 소속회원 삭제 - API NO. 4.4 -> Part 2
const editGroupMembers = async (connection, editGroupMembersParams) => {

  const updateGroupMembersQuery = `
    UPDATE GroupMembers
    SET status = "DELETED"
    WHERE groupIdx = ? and userIdx = ?;
      `;

  const [updateGroupMembersRows] = await connection.query(updateGroupMembersQuery, editGroupMembersParams);
  return updateGroupMembersRows;
};

// API NO. 4.4 -> Part 2 - Validation Check's groupUserIdx Status
const selectGroupUserIdxStatus = async (connection, groupUserIdxStatusParams) => {

  const selectGroupUserIdxQuery = `
    SELECT
    ClubMembers.status as ClubUserIdxStatus,
    GroupMembers.status as GroupUserIdxStatus,
    User.status as UserStatus
    FROM ClubMembers
    JOIN GroupMembers
    ON GroupMembers.userIdx = ClubMembers.userIdx
    JOIN User
    ON User.userIdx = GroupMembers.userIdx
    WHERE GroupMembers.userIdx = ? and GroupMembers.groupIdx = ? and ClubMembers.adminIdx = ?;
      `;

  const [selectGroupUserIdxRows] = await connection.query(selectGroupUserIdxQuery, groupUserIdxStatusParams);
  return selectGroupUserIdxRows;
};

// API NO. 4.4 -> Part 3 - Validation Check's InsertGroupUserIdx Status_1
const selectInsertGroupUserIdxStatus1 = async (connection, groupUserIdxStatus1Params) => {

  const selectInsertGroupUserIdxQuery = `
    SELECT
    ClubMembers.status as ClubUserIdxStatus,
    User.status as UserStatus
    FROM ClubMembers
    JOIN User
    ON User.userIdx = ClubMembers.userIdx
    WHERE ClubMembers.userIdx = ? and ClubMembers.adminIdx = ?;
      `;

  const [selectInsertGroupUserIdxRows] = await connection.query(selectInsertGroupUserIdxQuery, groupUserIdxStatus1Params);
  return selectInsertGroupUserIdxRows;
};

// API NO. 4.4 -> Part 3 - Validation Check's InsertGroupUserIdx Status_1
const selectInsertGroupUserIdxStatus2 = async (connection, groupUserIdxStatus2Params) => {

  const selectInsertGroupUserIdx2Query = `
    SELECT
    status as GroupUserIdxStatus
    FROM GroupMembers
    WHERE userIdx = ? and groupIdx = ?;
      `;

  const [selectInsertGroupUserIdx2Rows] = await connection.query(selectInsertGroupUserIdx2Query, groupUserIdxStatus2Params);
  return selectInsertGroupUserIdx2Rows;
};

// 그룹 삭제 - API NO. 4.5
const editGroup = async (connection, groupIdx) => {

  const updateGroupQuery = `
    UPDATE GroupList
    SET status = "DELETED"
    WHERE groupIdx = ?;
      `;

  const [updateGroupRows] = await connection.query(updateGroupQuery, groupIdx);
  return updateGroupRows;
};


  module.exports = { 
    selectUserPosts,
    insertGroup,
    insertGroupMembers,
    selectGroupList,
    selectTotalDataCount,
    selectGroupInfo,
    selectGroupMembers,
    selectGroupMembersTotalDataCount,
    editGroupInfo,
    editGroupMembers,
    editGroup,
    selectAdminIdx,
    selectMembersStatus,
    selectGroupIdxStatus,
    selectGroupUserIdxStatus,
    selectInsertGroupUserIdxStatus1,
    selectInsertGroupUserIdxStatus2,
    



    

  };