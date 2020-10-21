import React, { memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CreatePost from '../pages/CreatePost/CreatePost';
import Home from '../pages/Home/components/Home/Home';
import PrivateRoute from './PrivateRoute';
import Profile from '../pages/Profile/components/Profile/Profile';
import Settings from '../pages/Settings/Settings';
import SignUp from '../pages/SignUp/SignUp';
import SingIn from '../pages/SignIn/SignIn';
import UserArticle from '../pages/UserArticle/UserArticle';

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/signin">
        <SingIn />
      </Route>
      <Route path="/create">
        <PrivateRoute>
          <CreatePost />
        </PrivateRoute>
      </Route>
      <Route path="/settings">
        <PrivateRoute>
          <Settings />
        </PrivateRoute>
      </Route>
      <Route path="/article/:slug">
        <UserArticle />
      </Route>
      <Route path="/profile/:user">
        <Profile />
      </Route>
      <Route path="/home" component={Home}></Route>
      <Redirect exact from="/" to="/home/feed" />
      <Route path="*">
        <div>Not found</div>
      </Route>
    </Switch>
  );
};

export default memo(Routes);
