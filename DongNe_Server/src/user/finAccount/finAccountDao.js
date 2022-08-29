const retrieveFinAccount = async (connection, adminIdx) => {
  const getFinAccountQuery = `
        SELECT c.categoryName,f.finAccountIdx, DATE_FORMAT(f.finAccountDate, '%Y-%m-%d') as finAccountDate,f.isProfit,f.finAccountItem,f.finAccountCost,f.status
        FROM FinAccountCategory as c, (
            SELECT finAccountIdx, finAccountDate, isProfit, finAccountCategoryIdx, finAccountItem, finAccountCost,status
        FROM FinancialAccount
        WHERE adminIdx = ?
        ORDER BY finAccountDate DESC
        LIMIT 4
            ) f
        WHERE (c.finAccountCategoryIdx = f.finAccountCategoryIdx) AND ( c.status = "ACTIVE" AND f.status="ACTIVE")
  `;
  const getFinAccountQueryResult = await connection.query(getFinAccountQuery, adminIdx);
  return getFinAccountQueryResult;
};

const retrieveFinAccountByMonth = async (connection, adminIdxNum, year, month) => {
  const getFinAccountQuery = `
          SELECT finAccountIdx, finAccountItem, isProfit, finAccountCost, DATE_FORMAT(finAccountDate, '%Y-%m-%d') as finAccountDate, finAccountCategoryIdx,status
          FROM FinancialAccount
          WHERE (adminIdx = ? AND status="ACTIVE") and (MONTH(finAccountDate) = ? AND YEAR(finAccountDate) = ?)
  `;
  const getFinAccountQueryResult = await connection.query(getFinAccountQuery, [adminIdxNum, month, year]);
  return getFinAccountQueryResult;
};

const retrieveFinAccountByDay = async (connection, adminIdxNum, year, month, day) => {
  const retrieveFinAccountByDayQuery = `
          SELECT c.categoryName,f.finAccountIdx,DATE_FORMAT(f.finAccountDate, '%Y-%m-%d') as finAccountDate,f.isProfit,f.finAccountItem,f.finAccountCost, f.etc,f.status
          FROM FinAccountCategory as c, (
                SELECT finAccountIdx, finAccountItem, isProfit, finAccountCost, finAccountDate, finAccountCategoryIdx, etc,status
                FROM FinancialAccount
                WHERE adminIdx = ?  AND ((MONTH(finAccountDate) = ? AND YEAR(finAccountDate) = ?) AND DAY(finAccountDate) = ?)
              ) f
          WHERE c.finAccountCategoryIdx = f.finAccountCategoryIdx AND f.status="ACTIVE"
  `;
  const retrieveFinAccountByDayQueryResult = await connection.query(retrieveFinAccountByDayQuery, [adminIdxNum, month, year, day]);
  return retrieveFinAccountByDayQueryResult;
};

const selectCategory = async (connection, idx) => {
  const categoryInfoQuery = `
        SELECT categoryName 
        FROM FinAccountCategory
        WHERE finAccountCategoryIdx = ?;
  `;
  const categoryInfoResult = await connection.query(categoryInfoQuery, [idx]);
  return categoryInfoResult;
};

const selectCategoryByName = async (connection, adminIdx, categoryName) => {
  const categoryInfoQuery = `
        SELECT finAccountCategoryIdx
        FROM FinAccountCategory
        WHERE (adminIdx = ? and categoryName=?) and status = "ACTIVE"; 
  `;
  const categoryInfoResult = await connection.query(categoryInfoQuery, [adminIdx, categoryName]);
  return categoryInfoResult;
};

const selectAdminAccountByIdx = async (connection, accountIdx) => {
  const categoryInfoQuery = `
          SELECT finAccountIdx, status
          FROM FinancialAccount
          WHERE finAccountIdx = ? AND status="ACTIVE";
  `;
  const categoryInfoResult = await connection.query(categoryInfoQuery, [accountIdx]);
  return categoryInfoResult;
};

const retrieveAccountDates = async (connection, adminIdx) => {
  const retrieveAccountDatesQuery = `
          SELECT distinct DATE_FORMAT(finAccountDate, '%Y-%m-%d') as finAccountDate, status
          from FinancialAccount
          where adminIdx = ? and status="ACTIVE";
`;
  const retrieveAccountDatesResult = await connection.query(retrieveAccountDatesQuery, [adminIdx]);
  return retrieveAccountDatesResult;
};

module.exports = {
  retrieveFinAccount,
  retrieveFinAccountByMonth,
  retrieveFinAccountByDay,
  selectCategory,
  selectCategoryByName,
  selectAdminAccountByIdx,
  retrieveAccountDates
};
