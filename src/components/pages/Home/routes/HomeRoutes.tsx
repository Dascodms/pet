import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';

import GlobalFeed from '../pages/GlobalFeed/GlobalFeed';
import { HomePath } from './config';
import TagFeed from '../pages/TagFeed/TagFeed';
import YourFeed from '../pages/YourFeed/YourFeed';

const HomeRoutes = (): JSX.Element => {
  return (
    <Switch>
      <Route path={HomePath.GLOBAL_FEED}>
        <GlobalFeed />
      </Route>
      <Route path={HomePath.TAG_FEED}>
        <TagFeed />
      </Route>
      <Route path={HomePath.YOUR_FEED}>
        <YourFeed />
      </Route>
    </Switch>
  );
};

export default memo(HomeRoutes);
