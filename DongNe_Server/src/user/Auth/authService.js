const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { pool } = require("../../../config/database");
const authDao = require("./authDao");
const authProvider = require("./authProvider");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
import "dotenv/config";
import { logger } from "../../../config/winston";

// const secret_config = require("../../../config/secret");

exports.postSignIn = async (email, password) => {
  try {
    const emailRows = await authProvider.emailCheck(email);
    if (emailRows.length < 1) {
      return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
    }

    const hashedPassword = await crypto.createHash("sha512").update(password).digest("hex");

    const passwordRows = await authProvider.passwordCheck(email);

    if (passwordRows[0].password !== hashedPassword) {
      return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
    }

    //todo: 계정 상태 확인
    // 계정 상태 확인
    const userInfoRows = await authProvider.statusCheck(email);
    if (userInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }

    //todo jwt 토큰 만들기
    let token = jwt.sign(
      // 토큰의 내용 (payload)
      {
        adminId: userInfoRows[0].userIdx
      },
      process.env.JWT_SECRET_USER,
      {
        expiresIn: "365d",
        subject: "Admin"
      }
    );

    // const token = "i have to make this";
    return response(baseResponse.SUCCESS, {
      userId: userInfoRows[0].userIdx,
      jwt: token
    });
  } catch (err) {
    logger.error(`App - postSignIn Service error: ${err.message}`);

    return errResponse(baseResponse.DB_ERROR);
  }
};

export const createUser = async (name, userEmail, password, phoneNum, school, birth, address, introduction, userImgUrl) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const hashedPassword = await crypto.createHash("sha512").update(password).digest("hex");
    const userInfo = [name, userEmail, hashedPassword, phoneNum, school, birth, address, introduction, userImgUrl];

    //이메일 중복 확인
    const emailStatus = await authDao.selectUserEmail(connection, userEmail);
    if (emailStatus[0].length > 0) {
      return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);
    }

    const createUserResult = await authDao.insertUserInfo(connection, userInfo);
    return response(baseResponse.SUCCESS, createUserResult[0].insertId);
  } catch (err) {
    logger.error(`App - createUser Service error: ${err.message}`);

    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

export const joinClub = async (userIdx, clubCode) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    let adminIdx = null;
    try {
      adminIdx = await jwt.verify(clubCode, process.env.JWT_CLUB_CODE_SECRET).adminIdx;
    } catch (error) {
      return errResponse(baseResponse.JOIN_CLUB_CODE_INVALID);
    }
    const memberInfo = [userIdx, adminIdx];

    //동아리 상태 확인
    const [clubStatus] = await authDao.selectAdminAccountByIdx(connection, adminIdx);
    if (!clubStatus) {
      return errResponse(baseResponse.JOIN_CLUB_ERROR);
    }

    //유저 상태 확인
    const [userStatus] = await authDao.selectUserStatus(connection, userIdx);
    if (!userStatus) {
      return errResponse(baseResponse.JOIN_CLUB_USER_ERROR);
    }

    // 동아리에 유저 이미 가입했는지 확인
    const [joinedMemberInfo] = await authDao.selectMember(connection, memberInfo);
    if (joinedMemberInfo.length !== 0) {
      return errResponse(baseResponse.JOIN_CLUB_MEMBER_EXIST);
    }
    const joinClubResult = await authDao.userJoinClub(connection, memberInfo);
    return response(baseResponse.SUCCESS, joinClubResult[0].insertId);
  } catch (err) {
    logger.error(`App - joinClub Service error: ${err.message}`);

    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};
