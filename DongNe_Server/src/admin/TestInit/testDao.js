const selectUserPosts = async (connection) => {
  const selectTestUserQuery = `
        SELECT *
        FROM TestUser
        ;
      `;
  const [testResult] = await connection.query(selectTestUserQuery);

  return testResult;
};

module.exports = { selectUserPosts };
