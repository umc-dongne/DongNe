const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const authProvider = require("./authProvider");
const authService = require("./authService");
const regexEmail = require("regex-email");
const regexPwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
/**
 * API No. 2.1
 * API Name : 로그인 API
 * [POST] admin/auth/login
 */

export const login = async (req, res) => {
  /*
    body: userEmail, password
  */
  const { userEmail, password } = req.body;

  //UserEmail validation
  if (!userEmail) {
    return res.send(errResponse(baseResponse.SIGNIN_EMAIL_EMPTY));
  } else if (userEmail.length > 255) {
    return res.send(errResponse(baseResponse.SIGNIN_EMAIL_LENGTH));
  } else if (!regexEmail.test(userEmail)) {
    return res.send(errResponse(baseResponse.SIGNIN_EMAIL_ERROR_TYPE));
  }

  //adminPwd validation
  if (!password) {
    return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));
  } else if (password.length < 8) {
    return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_LENGTH));
  }
  // } else if (!regexPwd.test(password)) {
  //   return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_WRONG));
  // }

  const signInResponse = await authService.postSignIn(userEmail, password);
  return res.send(signInResponse);
};

/**
 * API No. 2.1
 * API Name : 회원가입 API
 * [POST] admin/auth/login
 */
export const registerUser = async (req, res) => {
  const { name, userEmail, password, phoneNum, school, birth, address, introduction, userImgUrl } = req.body;
  //빈 값 체크

  if (!userEmail) {
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_EMPTY));
  } else if (userEmail.length > 255) {
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_LENGTH));
  } else if (!regexEmail.test(userEmail)) {
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
  }

  //password validation
  if (!password) {
    return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_EMPTY));
  } else if (password.length < 8) {
    return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_LENGTH));
  }

  if (!name) return res.send(errResponse(baseResponse.SIGNUP_USERNAME_EMPTY));
  if (!birth) return res.send(errResponse(baseResponse.SIGNUP_BIRTHDATE_EMPTY));
  if (!school) return res.send(errResponse(baseResponse.SIGNUP_SCHOOL_EMPTY));
  if (!phoneNum) return res.send(errResponse(baseResponse.SIGNUP_PHONENUMBER_EMPTY));
  if (!address) return res.send(errResponse(baseResponse.SIGNUP_ADDRESS_EMPTY));

  const createUserResult = await authService.createUser(name, userEmail, password, phoneNum, school, birth, address, introduction, userImgUrl);
  return res.send(createUserResult);
};

export const joinClub = async (req, res) => {
  const userIdx = req.query.userIdx;
  const { clubCode } = req.body;

  //빈 값 체크
  if (!userIdx) return res.send(errResponse(baseResponse.JOIN_USERIDX_EMPTY));
  if (!clubCode) return res.send(errResponse(baseResponse.JOIN_CLUBCODE_EMPTY));
  const joinClubResult = await authService.joinClub(userIdx, clubCode);
  return res.send(joinClubResult);
};
