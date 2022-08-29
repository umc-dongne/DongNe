import SidebarTemplate from '../../template/SidebarTemplate';

import { useState } from 'react';

import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import Groups from '../../components/Groups';
import GroupSchedules from '../../components/GroupSchedules';

const AdminAttendPage = () => {
  const match = useRouteMatch();
  return (
    <SidebarTemplate pageNum={1} isAttendance={true}>
      <Switch>
        <Route path={match.path} component={Groups} exact />
        <Route path={`${match.path}/:id`} component={GroupSchedules} />
      </Switch>
    </SidebarTemplate>
  );
};

export default AdminAttendPage;
