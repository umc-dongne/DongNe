const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");

// admin Side's Router
import testRouter from "../src/admin/TestInit/TestRouter";
import scheduleRouter from "../src/admin/Schedule/scheduleRouter";
import userScheduleRouter from "../src/user/Schedule/scheduleRouter";
import attendanceRouter from "../src/admin/Attendance/attendanceRouter";
import userAttendanceRouter from "../src/user/Attendance/attendanceRouter";
const { swaggerUi, specs } = require("../modules/swagger");
const bodyParser = require("body-parser");
import adminGroupRouter from "../src/admin/Group/groupRoute";
import adminMemberRouter from "../src/admin/Member/memberRoute";
import adminAuthRouter from "../src/admin/Auth/authRouter";
import userAuthRouter from "../src/user/Auth/authRouter";
import adminfinAccountRouter from "../src/admin/FinAccount/finAccountRouter";
import userfinAccountRouter from "../src/user/finAccount/finAccountRouter";

// User Side's Router
import userGroupRouter from "../src/user/Group/groupRouter";
import userMemberRouter from "../src/user/Member/memberRouter";





module.exports = function () {
  const app = express();

  //json 설정
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //compression 설정
  app.use(compression());

  //method-override 설정
  app.use(methodOverride());

  //cors 설정
  app.use(cors());

  /*
    해당 줄부터 도메인 추가
   */
  
  // admin Side's API
  
  // 0. test API
  app.use("/test", testRouter);
  // 5. 스케줄 API (admin)
  app.use("/admin/schedule", scheduleRouter);
  // 6. 출결 API (admin)
  app.use("/admin/attendance", attendanceRouter);
  // 스케줄 API (user)
  app.use("/user/schedule", userScheduleRouter);
  // 출결 API (user)
  app.use("/user/attendance", userAttendanceRouter);
  
  

  // 1. 회원 명단 API
  app.use("/admin/member", adminMemberRouter);
  app.use("/user/member", userMemberRouter);

  // 2. 출결 그룹 API
  app.use("/admin/group", adminGroupRouter);
  app.use("/user/group", userGroupRouter);

  
  // 3. 인증 도메인
  app.use("/admin/auth", adminAuthRouter);
  app.use("/user/auth", userAuthRouter);

  //4. 회계 api
  app.use("/admin/finAccount", adminfinAccountRouter);
  app.use("/user/finAccount", userfinAccountRouter);
  

  // swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  return app;
};
