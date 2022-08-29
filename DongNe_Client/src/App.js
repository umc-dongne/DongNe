import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import page
import LoginLandingPage from './pages/LoginLandingPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import UserLoginPage from './pages/user/UserLoginPage';
import AdminRegisterPage from './pages/RegisterSelectPage';
import AdminRegisterCheck1 from './pages/admin/AdminRegisterCheck1';
import AdminRegisterCheck2 from './pages/admin/AdminRegisterCheck2';
import AdminRegisterCheck3 from './pages/admin/AdminRegisterCheck3';
import UserRegisterCheck1 from './pages/user/UserRegisterCheck1';
import UserRegisterCheck2 from './pages/user/UserRegisterCheck2';
import UserRegisterCheck3 from './pages/user/UserRegisterCheck3';
import AdminHomePage from './pages/admin/AdminHomePage';
import AdminAttendPage from './pages/admin/AdminAttendPage';
import AdminMembersPage from './pages/admin/AdminMembersPage';
import UserMainPage from './pages/user/UserMainPage';
import UserMyPage from './pages/user/UserMyPage';
import AdminFinancePage from './pages/admin/AdminFinancePage';

import AdminMyPage from './pages/admin/AdminMyPage';
import UserCommunityPage from './pages/user/UserCommunityPage';
import AdminCommunityPage from './pages/admin/AdminCommunityPage';
import UserHomePage from './pages/user/UserHomePage';
import UserAttendPage from './pages/user/UserAttendPage';
import TestPage from './pages/TestPage';

const App = () => {
  return (
    <Switch>
      <Route component={TestPage} path="/test" />
      <Route component={LoginLandingPage} path="/" exact />
      <Route component={AdminLoginPage} path="/admin/login" exact />
      <Route component={AdminHomePage} path="/admin/home" exact />
      <Route component={AdminAttendPage} path="/admin/attendance" />
      <Route component={UserLoginPage} path="/user/login" exact />
      <Route component={AdminRegisterPage} path="/register" exact />
      <Route
        component={AdminRegisterCheck1}
        path="/admin/register/check1"
        exact
      />
      <Route
        component={AdminRegisterCheck2}
        path="/admin/register/check2"
        exact
      />
      <Route
        component={AdminRegisterCheck3}
        path="/admin/register/check3"
        exact
      />
      <Route
        component={UserRegisterCheck1}
        path="/user/register/check1"
        exact
      />
      <Route
        component={UserRegisterCheck2}
        path="/user/register/check2"
        exact
      />
      <Route
        component={UserRegisterCheck3}
        path="/user/register/check3"
        exact
      />
      <Route component={AdminMembersPage} path="/admin/members" exact />
      <Route component={UserMainPage} path="/user/main" exact />
      <Route component={UserMyPage} path="/user/myPage" exact />
      <Route component={AdminMyPage} path="/admin/myPage" exact />
      <Route component={UserCommunityPage} path="/user/community" exact />
      <Route component={AdminCommunityPage} path="/admin/community" exact />
      <Route component={AdminFinancePage} path="/admin/finance" exact />
      {/* 추후 로그인 후 넘어가는 페이지 수정시 이건요지워주세요 */}
      <Route component={UserHomePage} path="/user/home" exact />
      <Route component={UserAttendPage} path="/user/attendance" />
    </Switch>
  );
};

export default App;
