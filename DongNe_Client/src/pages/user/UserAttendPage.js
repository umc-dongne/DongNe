import SidebarTemplate from '../../template/SidebarTemplate';

import { useState } from 'react';

import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import Groups from '../../components/Groups';
import GroupSchedules from '../../components/GroupSchedules';
import UserGroups from '../../components/user/UserGroups';
import UserSidebarTemplate from '../../template/UserSidebarTemplate';
import UserGroupSchedules from '../../components/user/UserGroupSchedules';

const UserAttendPage = () => {
  const match = useRouteMatch();
  return (
    <UserSidebarTemplate pageNum={1} isAttendance={true}>
      <Switch>
        <Route path={match.path} component={UserGroups} exact />
        <Route path={`${match.path}/:id`} component={UserGroupSchedules} />
      </Switch>
    </UserSidebarTemplate>
  );
};

export default UserAttendPage;
