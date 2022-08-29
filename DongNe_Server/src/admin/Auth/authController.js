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
    body: email, password
  */
  const { adminEmail, adminPwd } = req.body;

  //AdminEmail validation
  if (!adminEmail) {
    return res.send(errResponse(baseResponse.SIGNIN_EMAIL_EMPTY));
  } else if (adminEmail.length > 255) {
    return res.send(errResponse(baseResponse.SIGNIN_EMAIL_LENGTH));
  } else if (!regexEmail.test(adminEmail)) {
    return res.send(errResponse(baseResponse.SIGNIN_EMAIL_ERROR_TYPE));
  }

  //adminPwd validation
  if (!adminPwd) {
    return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));
  } else if (adminPwd.length < 8) {
    return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_LENGTH));
  }
  // } else if (!regexPwd.test(adminPwd)) {
  //   return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_WRONG));
  // }

  const signInResponse = await authService.postSignIn(adminEmail, adminPwd);
  return res.send(signInResponse);
};

/**
 * API No. 2.1
 * API Name : 회원가입 API
 * [POST] admin/auth/login
 */
export const registerAdmin = async (req, res) => {
  const { clubName, adminEmail, adminPwd, establishmentYear, clubRegion, clubIntroduction, clubWebLink, clubImgUrl } = req.body;
  //빈 값 체크

  if (!adminEmail) {
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_EMPTY));
  } else if (adminEmail.length > 255) {
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_LENGTH));
  } else if (!regexEmail.test(adminEmail)) {
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
  }

  //password validation
  if (!adminPwd) {
    return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_EMPTY));
  } else if (adminPwd.length < 8) {
    return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_LENGTH));
  }

  if (!clubName) return res.send(response(baseResponse.SIGNUP_CLUBNAME_EMPTY));
  // if (!clubIntroduction) return res.send(response(baseResponse.SIGNUP_BIRTHDATE_EMPTY));
  // if (!establishmentYear) return res.send(response(baseResponse.SIGNUP_PHONENUMBER_EMPTY));
  // if (!clubRegion) return res.send(response(baseResponse.SIGNUP_PHONENUMBER_EMPTY));

  const createAdminResult = await authService.createAdmin(clubName, adminEmail, adminPwd, establishmentYear, clubRegion, clubIntroduction, clubWebLink, clubImgUrl);
  return res.send(createAdminResult);
};
