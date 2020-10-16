import React, { memo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import ProfileFavoritedFeed from '../pages/ProfileFavoritedFeed/ProfileFavoritedFeed';
import ProfileFeed from '../pages/ProfileFeed/ProfileFeed';

const ProfileRoutes = (): JSX.Element => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/favorite`}>
        <ProfileFavoritedFeed />
      </Route>
      <Route path={path}>
        <ProfileFeed />
      </Route>
    </Switch>
  );
};

export default ProfileRoutes;
