module.exports = {
  // Request SUCCESS
  SUCCESS: { isSuccess: true, code: 1000, message: "API 요청 성공" },

  // Request ERROR
  FAILURE: { isSuccess: false, code: 2000, message: "API 요청 실패" },

  SCHEDULE_SCHEDULEIDX_EMPTY: {
    isSuccess: false,
    code: 2001,
    message: "scheduleIdx를 입력해주세요."
  },

  SCHEDULE_SCHEDULEIDX_LENGTH: {
    isSuccess: false,
    code: 2002,
    message: "scheduleIdx는 0보다 큰 값으로 입력해주세요."
  },

  SCHEDULE_POST_PARAMS_EMPTY: {
    isSuccess: false,
    code: 2003,
    message: "파라미터를 모두 입력하세요."
  },

  SCHEDULE_SCHEDULEDATE_EMPTY: {
    isSuccess: false,
    code: 2005,
    message: "스케줄 날짜를 입력하세요."
  },

  SCHEDULE_INITTIME_EMPTY: {
    isSuccess: false,
    code: 2006,
    message: "스케줄 시작시간을 입력하세요."
  },

  SCHEDULE_ENDTIME_EMPTY: {
    isSuccess: false,
    code: 2007,
    message: "스케줄 종료시간을 입력하세요."
  },

  SCHEDULE_INTRODUCTION_EMPTY: {
    isSuccess: false,
    code: 2008,
    message: "스케줄 소개를 입력하세요."
  },

  SCHEDULE_PLACE_EMPTY: {
    isSuccess: false,
    code: 2009,
    message: "스케줄 장소를 입력하세요."
  },

  SCHEDULE_SCHEDULENAME_EMPTY: {
    isSuccess: false,
    code: 2010,
    message: "스케줄 이름을 입력하세요."
  },

  SCHEDULE_INTRODUCTION_LENGTH: {
    isSuccess: false,
    code: 2011,
    message: "스케줄 소개는 150자 이하로 입력가능합니다."
  },

  SCHEDULE_PLACE_LENGTH: {
    isSuccess: false,
    code: 2012,
    message: "스케줄 장소는 50자 이하로 입력가능합니다."
  },

  SCHEDULE_SCHEDULENAME_LENGTH: {
    isSuccess: false,
    code: 2013,
    message: "스케줄 이름은 100자 이하로 입력가능합니다."
  },

  SCHEDULE_SCHEDULEDATE_VALID: {
    isSuccess: false,
    code: 2014,
    message: "스케줄 날짜를 YYYY/MM/DD 또는 YYYY-MM-DD 형식으로 입력하세요."
  },

  SCHEDULE_INITTIME_VALID: {
    isSuccess: false,
    code: 2015,
    message: "스케줄 시작시간을 YYYY/MM/DD HH:mm:ss 또는 YYYY-MM-DD HH:mm:ss 형식으로 입력하세요."
  },

  SCHEDULE_ENDTIME_VALID: {
    isSuccess: false,
    code: 2016,
    message: "스케줄 종료시간을 YYYY/MM/DD HH:mm:ss 또는 YYYY-MM-DD HH:mm:ss 형식으로 입력하세요."
  },

  GROUP_GROUPIDX_EMPTY: {
    isSuccess: false,
    code: 2017,
    message: "groupIdx를 입력해주세요."
  },

  GROUP_GROUPIDX_LENGTH: {
    isSuccess: false,
    code: 2018,
    message: "groupIdx는 0보다 큰 값으로 입력해주세요."
  },

  ATTENDANCE_CODE_EMPTY: {
    isSuccess: false,
    code: 2019,
    message: "출석코드를 입력해주세요."
  },
  ATTENDANCE_CODE_LENGTH: {
    isSuccess: false,
    code: 2023,
    message: "출석코드를 45자 이하로 입력해주세요."
  },

  // Reponse ERROR
  SCHEDULE_STATUS_INACTIVE: {
    isSuccess: false,
    code: 3004,
    message: "이미 삭제된 스케줄입니다."
  },

  ATTENDANCE_ERROR: {
    isSuccess: false,
    code: 3003,
    message: "출결코드가 틀렸습니다."
  },

  ATTENDANCE_ERROR: {
    isSuccess: false,
    code: 3003,
    message: "출결코드가 틀렸습니다."
  },

  SCHEDULE_SCHEDULEIDX_EMPTY: {
    isSuccess: false,
    code: 2001,
    message: "scheduleIdx를 입력해주세요."
  },
  SCHEDULE_SCHEDULEIDX_LENGTH: {
    isSuccess: false,
    code: 2002,
    message: "scheduleIdx는 0보다 큰 값으로 입력해주세요."
  },
  SCHEDULE_POST_PARAMS_EMPTY: {
    isSuccess: false,
    code: 2003,
    message: "파라미터를 모두 입력하세요."
  },
  SCHEDULE_SCHEDULEDATE_EMPTY: {
    isSuccess: false,
    code: 2005,
    message: "스케줄 날짜를 입력하세요."
  },
  SCHEDULE_INITTIME_EMPTY: {
    isSuccess: false,
    code: 2006,
    message: "스케줄 시작시간을 입력하세요."
  },
  SCHEDULE_ENDTIME_EMPTY: {
    isSuccess: false,
    code: 2007,
    message: "스케줄 종료시간을 입력하세요."
  },
  SCHEDULE_INTRODUCTION_EMPTY: {
    isSuccess: false,
    code: 2008,
    message: "스케줄 소개를 입력하세요."
  },
  SCHEDULE_PLACE_EMPTY: {
    isSuccess: false,
    code: 2009,
    message: "스케줄 장소를 입력하세요."
  },
  SCHEDULE_SCHEDULENAME_EMPTY: {
    isSuccess: false,
    code: 2010,
    message: "스케줄 이름을 입력하세요."
  },
  SCHEDULE_INTRODUCTION_LENGTH: {
    isSuccess: false,
    code: 2011,
    message: "스케줄 소개는 150자 이하로 입력가능합니다."
  },
  SCHEDULE_PLACE_LENGTH: {
    isSuccess: false,
    code: 2012,
    message: "스케줄 장소는 50자 이하로 입력가능합니다."
  },
  SCHEDULE_SCHEDULENAME_LENGTH: {
    isSuccess: false,
    code: 2013,
    message: "스케줄 이름은 100자 이하로 입력가능합니다."
  },
  SCHEDULE_SCHEDULEDATE_VALID: {
    isSuccess: false,
    code: 2014,
    message: "스케줄 날짜를 YYYY/MM/DD 또는 YYYY-MM-DD 형식으로 입력하세요."
  },
  SCHEDULE_INITTIME_VALID: {
    isSuccess: false,
    code: 2015,
    message: "스케줄 시작시간을 YYYY/MM/DD HH:mm:ss 또는 YYYY-MM-DD HH:mm:ss 형식으로 입력하세요."
  },
  SCHEDULE_ENDTIME_VALID: {
    isSuccess: false,
    code: 2016,
    message: "스케줄 종료시간을 YYYY/MM/DD HH:mm:ss 또는 YYYY-MM-DD HH:mm:ss 형식으로 입력하세요."
  },

  GROUP_GROUPIDX_EMPTY: {
    isSuccess: false,
    code: 2017,
    message: "groupIdx를 입력해주세요."
  },
  GROUP_GROUPIDX_LENGTH: {
    isSuccess: false,
    code: 2018,
    message: "groupIdx는 0보다 큰 값으로 입력해주세요."
  },

  // Reponse ERROR

  SCHEDULE_STATUS_INACTIVE: {
    isSuccess: false,
    code: 3001,
    message: "이미 삭제된 스케줄입니다."
  },

  //Connection, Transaction 등의 서버 오류
  DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
  SERVER_ERROR: { isSuccess: false, code: 4001, message: "서버 에러" },

  SIGNIN_PASSWORD_LENGTH: {
    isSuccess: false,
    code: 2026,
    message: "비밀번호의 길이는 8자리 이상으로 입력해주세요."
  },

  // Response error
  SIGNUP_REDUNDANT_EMAIL: {
    isSuccess: false,
    code: 3001,
    message: "중복된 이메일입니다."
  },
  SIGNUP_REDUNDANT_NICKNAME: {
    isSuccess: false,
    code: 3002,
    message: "중복된 닉네임입니다."
  },

  SIGNIN_EMAIL_WRONG: {
    isSuccess: false,
    code: 3003,
    message: "아이디가 잘못 되었습니다."
  },
  SIGNIN_PASSWORD_WRONG: {
    isSuccess: false,
    code: 3004,
    message: "비밀번호가 잘못 되었습니다."
  },
  SIGNIN_INACTIVE_ACCOUNT: {
    isSuccess: false,
    code: 3005,
    message: "비활성화 된 계정입니다. 고객센터에 문의해주세요."
  },
  SIGNIN_WITHDRAWAL_ACCOUNT: {
    isSuccess: false,
    code: 3006,
    message: "탈퇴 된 계정입니다. 고객센터에 문의해주세요."
  },
  SIGNUP_CLUBNAME_EMPTY: {
    isSuccess: false,
    code: 3007,
    message: "탈퇴 된 계정입니다. 고객센터에 문의해주세요."
  },

  // Common
  TOKEN_EMPTY: {
    isSuccess: false,
    code: 2000,
    message: "JWT 토큰을 입력해주세요."
  },
  TOKEN_VERIFICATION_FAILURE: {
    isSuccess: false,
    code: 3000,
    message: "JWT 토큰 검증 실패"
  },
  TOKEN_VERIFICATION_SUCCESS: {
    isSuccess: true,
    code: 1001,
    message: "JWT 토큰 검증 성공"
  }, // ?

  //Request error
  SIGNUP_EMAIL_EMPTY: {
    isSuccess: false,
    code: 2001,
    message: "이메일을 입력해주세요."
  },
  SIGNUP_EMAIL_LENGTH: {
    isSuccess: false,
    code: 2002,
    message: "이메일은 30자리 미만으로 입력해주세요."
  },
  SIGNUP_EMAIL_ERROR_TYPE: {
    isSuccess: false,
    code: 2003,
    message: "이메일을 형식을 정확하게 입력해주세요."
  },
  SIGNUP_PASSWORD_EMPTY: {
    isSuccess: false,
    code: 2004,
    message: "비밀번호를 입력 해주세요."
  },
  SIGNUP_PASSWORD_LENGTH: {
    isSuccess: false,
    code: 2005,
    message: "비밀번호는 8~20자리를 입력해주세요."
  },
  SIGNUP_USERNAME_EMPTY: {
    isSuccess: false,
    code: 2006,
    message: "이름을 입력해주세요."
  },
  SIGNUP_BIRTHDATE_EMPTY: {
    isSuccess: false,
    code: 2007,
    message: "생년월일을 입력해주세요."
  },
  SIGNUP_SCHOOL_EMPTY: {
    isSuccess: false,
    code: 2008,
    message: "학교를 입력해주세요."
  },
  SIGNUP_PHONENUMBER_EMPTY: {
    isSuccess: false,
    code: 2009,
    message: "전화번호를 입력해주세요."
  },
  SIGNUP_ADDRESS_EMPTY: {
    isSuccess: false,
    code: 2010,
    message: "거주지를 입력해주세요."
  },

  SIGNIN_EMAIL_EMPTY: {
    isSuccess: false,
    code: 2011,
    message: "이메일을 입력해주세요."
  },
  SIGNIN_EMAIL_LENGTH: {
    isSuccess: false,
    code: 2012,
    message: "이메일은 30자리 미만으로 입력해주세요."
  },
  SIGNIN_EMAIL_ERROR_TYPE: {
    isSuccess: false,
    code: 2013,
    message: "이메일을 형식을 정확하게 입력해주세요."
  },
  SIGNIN_PASSWORD_EMPTY: {
    isSuccess: false,
    code: 2014,
    message: "비밀번호를 입력 해주세요."
  },

  // Response error
  SIGNUP_REDUNDANT_EMAIL: {
    isSuccess: false,
    code: 3001,
    message: "중복된 이메일입니다."
  },

  SIGNIN_EMAIL_WRONG: {
    isSuccess: false,
    code: 3003,
    message: "아이디가 잘못 되었습니다."
  },
  SIGNIN_PASSWORD_WRONG: {
    isSuccess: false,
    code: 3004,
    message: "비밀번호가 잘못 되었습니다."
  },
  SIGNIN_INACTIVE_ACCOUNT: {
    isSuccess: false,
    code: 3005,
    message: "비활성화 된 계정입니다. 고객센터에 문의해주세요."
  },
  SIGNIN_WITHDRAWAL_ACCOUNT: {
    isSuccess: false,
    code: 3006,
    message: "탈퇴 된 계정입니다. 고객센터에 문의해주세요."
  },

  // ADMIN's errResponse

  ADMIN_ADMINIDX_EMPTY: {
    isSuccess: false,
    code: 2001,
    message: "adminIdx를 입력해주세요."
  },
  ADMIN_ADMINIDX_LENGTH: {
    isSuccess: false,
    code: 2002,
    message: "adminIdx를 0보다 큰 값을 입력해주세요."
  },
  ADMIN_ADMINIDX_STATUS: {
    isSuccess: false,
    code: 2003,
    message: "유효하지 않는 adminIdx입니다."
  },
  ADMIN_TEAMNAME_EMPTY: {
    isSuccess: false,
    code: 2004,
    message: "teamName을 입력해주세요."
  },
  ADMIN_TEAMNAME_LENGTH: {
    isSuccess: false,
    code: 2005,
    message: "teamName을 40자 이내로 입력해주세요."
  },
  ADMIN_CLUBTEAMLISTIDX_EMPTY: {
    isSuccess: false,
    code: 2006,
    message: "clubTeamListIdx를 입력해주세요."
  },
  ADMIN_CLUBTEAMLISTIDX_LENGTH: {
    isSuccess: false,
    code: 2007,
    message: "clubTeamListIdx를 0보다 큰 값을 입력해주세요."
  },
  ADMIN_CLUBTEAMLISTIDX_STATUS: {
    isSuccess: false,
    code: 2008,
    message: "유효하지 않은 clubTeamListIdx입니다."
  },
  ADMIN_GROUPIDX_STATUS: {
    isSuccess: false,
    code: 2009,
    message: "유효하지 않은 groupIdx입니다."
  },

  ADMIN_DELETE_GROUPUSERIDX_STATUS: {
    isSuccess: false,
    code: 2010,
    message: "본인 동아리내의 그룹에서 삭제를 수행할 수 없는 userIdx입니다."
  },

  ADMIN_INSERT_GROUPUSERIDX_STATUS: {
    isSuccess: false,
    code: 2011,
    message: "본인 동아리내의 그룹에서 추가를 수행할 수 없는 userIdx입니다."
  },

  ADMIN_ADMINIDX_NOT_MATCH: {
    isSuccess: false,
    code: 2020,
    message: "adminIdx를 입력해주세요."
  },

  ADMIN_CLUBNAME_EMPTY: {
    isSuccess: false,
    code: 2021,
    message: "clubName을 입력해주세요."
  },

  ADMIN_CLUBNAME_LENGTH: {
    isSuccess: false,
    code: 2022,
    message: "clubName을 45자 이내로 입력해주세요."
  },

  ADMIN_ESTABLISHMENTYEAR_EMPTY: {
    isSuccess: false,
    code: 2023,
    message: "establishmentYear을 입력해주세요."
  },

  ADMIN_ESTABLISHMENTYEAR_TYPE: {
    isSuccess: false,
    code: 2024,
    message: "establishmentYear의 입력 형식을 YYYY-MM-DD 또는 YYYY/MM/DD으로 입력해주세요."
  },

  ADMIN_CLUBREGION_EMPTY: {
    isSuccess: false,
    code: 2025,
    message: "clubRegion을 입력해주세요."
  },

  ADMIN_CLUREGION_LENGTH: {
    isSuccess: false,
    code: 2026,
    message: "clubRegion을 45자 이내로 입력해주세요."
  },

  ADMIN_CLUBWEBLINK_EMPTY: {
    isSuccess: false,
    code: 2027,
    message: "clubWebLink를 입력해주세요."
  },

  ADMIN_CLUBWEBLINK_LENGTH: {
    isSuccess: false,
    code: 2027,
    message: "clubWebLink를 45자 이내로 입력해주세요."
  },

  ADMIN_CLUBINTRODUCTION_EMPTY: {
    isSuccess: false,
    code: 2028,
    message: "clubIntroduction을 입력해주세요."
  },

  ADMIN_CLUBCATEGORYIDX_EMPTY: {
    isSuccess: false,
    code: 2029,
    message: "clubCategoryIdx를 입력해주세요."
  },

  ADMIN_CLUBCATEGORYIDX_LENGTH: {
    isSuccess: false,
    code: 2029,
    message: "clubCategoryIdx를 -1보다 큰 값을 입력해주세요."
  },

  //USER's errResponse
  USER_USERIDX_EMPTY: {
    isSuccess: false,
    code: 3000,
    message: "userIdx를 입력해주세요."
  },
  USER_USERIDX_LENGTH: {
    isSuccess: false,
    code: 3001,
    message: "userIdx를 0보다 큰 값을 입력해주세요."
  },
  USER_USERIDX_STATUS: {
    isSuccess: false,
    code: 3002,
    message: "유효하지 않는 userIdx입니다."
  },
  USER_ADMINIDX_STATUS: {
    isSuccess: false,
    code: 3003,
    message: "본인 유저의 동아리에 대해서만 접근하세요. 본인이 속하지 않는 동아리에 대한 접근시도였습니다."
  },
  USER_RETRIEVEUSERIDX_EMPTY: {
    isSuccess: false,
    code: 3004,
    message: "상세 조회할 userIdx를 입력해주세요."
  },
  USER_RETRIEVEUSERIDX_LENGTH: {
    isSuccess: false,
    code: 3004,
    message: "상세 조회할 userIdx를 0보다 큰 값으로 입력해주세요."
  },
  USER_ADMINIDX_EMPTY: {
    isSuccess: false,
    code: 3005,
    message: "본인 유저가 속하고 있는 adminIdx를 입력해주세요."
  },
  USER_ADMINIDX_LENGTH: {
    isSuccess: false,
    code: 3005,
    message: "본인 유저가 속하고 있는 adminIdx를 0보다 큰 값으로 입력해주세요."
  },
  USER_RETRIEVEUSERIDX_STATUS: {
    isSuccess: false,
    code: 3006,
    message: "상세 조회할 userIdx가 유효하지 않습니다. 본인유저의 동아리에 소속된 userIdx를 입력해주세요."
  },
  USER_GROUPIDX_STATUS: {
    isSuccess: false,
    code: 3007,
    message: "(본인) 유저가 속한 동아리에서 유효하지 않은 groupIdx입니다."
  },
  USER_USER_STATUS: {
    isSuccess: false,
    code: 3008,
    message: "동네 웹에서 유효하지 않은 userIdx입니다."
  },
  USER_USERIDX_NOT_MATCH: {
    isSuccess: false,
    code: 3020,
    message: "adminIdx를 입력해주세요."
  },
  //
  USER_NAME_EMPTY: {
    isSuccess: false,
    code: 3021,
    message: "유저의 name을 입력해주세요."
  },

  USER_NAME_LENGTH: {
    isSuccess: false,
    code: 3022,
    message: "유저의 name을 30자 이내로 입력해주세요."
  },

  USER_BIRTH_EMPTY: {
    isSuccess: false,
    code: 3023,
    message: "유저의 birth를 입력해주세요."
  },

  USER_BIRTH_TYPE: {
    isSuccess: false,
    code: 3024,
    message: "유저의 birth의 입력 형식을 YYYY-MM-DD 또는 YYYY/MM/DD으로 입력해주세요."
  },

  USER_SCHOOL_EMPTY: {
    isSuccess: false,
    code: 3025,
    message: "유저의 school를 입력해주세요."
  },

  USER_SCHOOL_LENGTH: {
    isSuccess: false,
    code: 3026,
    message: "유저의 school를 45자 이내로 입력해주세요."
  },

  USER_PHONENUM_EMPTY: {
    isSuccess: false,
    code: 3027,
    message: "유저의 phoneNum을 입력해주세요."
  },

  USER_PHONENUM_LENGTH: {
    isSuccess: false,
    code: 3028,
    message: "유저의 phoneNum을 45자 이내로 입력해주세요."
  },

  USER_ADDRESS_EMPTY: {
    isSuccess: false,
    code: 3029,
    message: "유저의 address를 입력해주세요."
  },

  USER_ADDRESS_LENGTH: {
    isSuccess: false,
    code: 3030,
    message: "유저의 address를 100자 이내로 입력해주세요."
  },

  USER_INTRODUCTION_EMPTY: {
    isSuccess: false,
    code: 3031,
    message: "유저의 introduction를 입력해주세요."
  },

  USER_INTRODUCTION_LENGTH: {
    isSuccess: false,
    code: 3032,
    message: "유저의 introduction를 450자 이내로 입력해주세요."
  },
  //
  GROUP_GROUPNAME_EMPTY: {
    isSuccess: false,
    code: 4001,
    message: "groupName을 입력해주세요."
  },
  GROUP_GROUPNAME_LENGTH: {
    isSuccess: false,
    code: 4002,
    message: "groupName를 45자 이내로 입력해주세요."
  },
  GROUP_GROUPINTRODUCTION_EMPTY: {
    isSuccess: false,
    code: 4003,
    message: "groupIntroduction을 입력해주세요."
  },
  GROUP_GROUPINTRODUCTION_LENGTH: {
    isSuccess: false,
    code: 4004,
    message: "groupIntroduction을 200자 이내로 입력해주세요."
  },
  GROUP_USERIDX_EMPTY: {
    isSuccess: false,
    code: 4005,
    message: "group에 추가/삭제할 userIdx를 입력해주세요."
  },
  GROUP_USERIDX_LENGTH: {
    isSuccess: false,
    code: 4006,
    message: "group에 추가/삭제할 userIdx를 0보다 큰 값을 입력해주세요."
  },
  GROUP_GROUPIDX_EMPTY: {
    isSuccess: false,
    code: 4007,
    message: "groupIdx를 입력해주세요."
  },
  GROUP_GROUPIDX_LENGTH: {
    isSuccess: false,
    code: 4008,
    message: "groupIdx를 0보다 큰 값을 입력해주세요."
  },
  GROUP_GROUPCATEGORY_EMPTY: {
    isSuccess: false,
    code: 4009,
    message: "groupCategory를 입력해주세요."
  },
  GROUP_GROUPCATEGORY_LENGTH: {
    isSuccess: false,
    code: 4010,
    message: "groupCategory를 30자 이내로 입력해주세요."
  },

  GROUP_USERIDX_EXIST: {
    isSuccess: false,
    code: 4011,
    message: "유효하지 않은 userIdx입니다."
  },

  //finAccount's Request Error
  FINACCOUNT_ADMINIDX_EMPTY: {
    isSuccess: false,
    code: 5001,
    message: "admin 인덱스를 입력해주세요."
  },
  FINACCOUNT_CATEGORY_EMPTY: {
    isSuccess: false,
    code: 5002,
    message: "finAccount 카테고리를 입력해주세요."
  },
  FINACCOUNT_ISPROFIT_EMPTY: {
    isSuccess: false,
    code: 5003,
    message: "isProfit을 입력해주세요."
  },
  FINACCOUNT_ITEM_EMPTY: {
    isSuccess: false,
    code: 5004,
    message: "finAccount 항목을 입력해주세요."
  },
  FINACCOUNT_COST_EMPTY: {
    isSuccess: false,
    code: 5005,
    message: "finAccount 비용을 입력해주세요."
  },
  FINACCOUNT_DATE_EMPTY: {
    isSuccess: false,
    code: 5006,
    message: "finAccount 날짜를 입력해주세요."
  },
  FINACCOUNT_ISPROFIT_WRONG: {
    isSuccess: false,
    code: 5007,
    message: "isProfit을 0이나 1로 입력해주세요."
  },
  FINACCOUNT_COST_NOT_NUMBER: {
    isSuccess: false,
    code: 5008,
    message: "cost를 숫자로 입력해주세요."
  },
  FINACCOUNT_DATE_WRONG: {
    isSuccess: false,
    code: 5009,
    message: "Date를 'yyyy-mm-dd' 형식에 맞춰 입력해주세요."
  },
  FINACCOUNT_ITEM_LENGTH_WRONG: {
    isSuccess: false,
    code: 5010,
    message: "항목 이름의 길이를 35자 이하로 작성해주세요."
  },
  FINACCOUNT_ETC_LENGTH_WRONG: {
    isSuccess: false,
    code: 5011,
    message: "etc 이름의 길이를 180자 이하로 작성해주세요."
  },
  FINACCOUNT_CATEGORY_NAME_EMPTY: {
    isSuccess: false,
    code: 5012,
    message: "카테고리 이름을 적어주세요."
  },
  FINACCOUNT_CATEGORY_LENGTH_WRONG: {
    isSuccess: false,
    code: 5013,
    message: "카테고리 35자 이하로 적어주세요."
  },
  FINACCOUNT_YEAR_EMPTY: {
    isSuccess: false,
    code: 5014,
    message: "날짜의 year을 적어주세요."
  },
  FINACCOUNT_MONTH_EMPTY: {
    isSuccess: false,
    code: 5015,
    message: "날짜의 month를 적어주세요."
  },
  FINACCOUNT_DAY_EMPTY: {
    isSuccess: false,
    code: 5016,
    message: "날짜의 day을 적어주세요."
  },
  FINACCOUNT_CATEGORYIDX_EMPTY: {
    isSuccess: false,
    code: 5017,
    message: "카테고리 idx을 적어주세요."
  },
  FINACCOUNT_CATEGORYNAME_EMPTY: {
    isSuccess: false,
    code: 5018,
    message: "카테고리 이름을 적어주세요."
  },
  FINACCOUNT_ACCOUNTIDX_EMPTY: {
    isSuccess: false,
    code: 5019,
    message: "회계 항목 idx를 적어주세요."
  },
  FINACCOUNT_USERIDX_EMPTY: {
    isSuccess: false,
    code: 5020,
    message: "user 인덱스를 입력해주세요."
  },
  //finAccount's Response Error
  FINACCOUNT_CATEGORY_INACTIVE: {
    isSuccess: false,
    code: 6001,
    message: "비활성화 된 카테고리입니다."
  },
  FINACCOUNT_CATEGORY_DELETED: {
    isSuccess: false,
    code: 6002,
    message: "삭제된 카테고리입니다."
  },
  FINACCOUNT_CATEGORY_EXIST: {
    isSuccess: false,
    code: 6003,
    message: "이미 존재하는 카테고리입니다."
  },
  FINACCOUNT_NOT_EXIST: {
    isSuccess: false,
    code: 6004,
    message: "존재하지 않는 회계항목입니다."
  },
  FINACCOUNT_ALREADY_DELETED: {
    isSuccess: false,
    code: 6005,
    message: "이미 삭제된 회계항목입니다."
  },
  FINACCOUNT_CATEGORY_NOT_IN_CLUB: {
    isSuccess: false,
    code: 6006,
    message: "본 동아리의 카테고리가 아닙니다."
  },
  FINACCOUNT_CATEGORY_NOT_EXIST: {
    isSuccess: false,
    code: 6007,
    message: "존재하지 않는 카테고리입니다."
  },
  FINACCOUNT_NOT_IN_CLUB: {
    isSuccess: false,
    code: 6008,
    message: "본 동아리의 회계항목이 아닙니다."
  },

  //DB Error
  DB_ERRORS: { isSuccess: false, code: 5000, message: "데이터베이스 에러" },

  // JWT token errResponse
  JWT_TOKEN_DIFFERENT: {
    isSuccess: false,
    code: 6000,
    message: "접근할 수 없는 동아리입니다. 본인(관리자 권한) 동아리에 대해서만 접근하세요."
  },
  JWT_GROUP_DIFFERENT: {
    isSuccess: false,
    code: 6001,
    message: "본인 동아리에서 대해서만 작업을 수행할 수 있습니다."
  },
  JWT_GROUPLIST_DIFFERENT: {
    isSuccess: false,
    code: 6002,
    message: "본인 동아리에 대해서만 그룹리스트를 조회할 수 있습니다."
  },

  JWT_USER_TOKEN_DIFFERENT: {
    isSuccess: false,
    code: 6003,
    message: "userIdx가 입력하신 토큰과 다릅니다. 본인의 userIdx에 대해서만 접근하세요."
  },

  JOIN_CLUB_CODE_INVALID: {
    isSuccess: false,
    code: 7001,
    message: "입력하신 클럽코드가 유효하지 않습니다. 다시 입력해주세요."
  },
  JOIN_CLUB_MEMBER_EXIST: {
    isSuccess: false,
    code: 7002,
    message: "이미 본 동아리에 가입한 회원입니다."
  },
  JOIN_CLUB_USER_ERROR: {
    isSuccess: false,
    code: 7003,
    message: "존재하지 않는 유저입니다."
  },
  JOIN_CLUB_ERROR: {
    isSuccess: false,
    code: 7004,
    message: "존재하지 않는 클럽입니다."
  },
  JOIN_USERIDX_EMPTY: {
    isSuccess: false,
    code: 7005,
    message: "유저 인덱스를 입력해주세요."
  },
  JOIN_CLUBCODE_EMPTY: {
    isSuccess: false,
    code: 7006,
    message: "클럽 코드를 입력해주세요."
  },

  // Paging's errResponse
  PAGING_PARAMS_EMPTY: {
    isSuccess: false,
    code: 7000,
    message: "paging 파라미터를 입력해주세요."
  },
  PAGING_PAGE_WRONG: {
    isSuccess: false,
    code: 7001,
    message: "조회할 수 없는 page 번호입니다."
  }
};
