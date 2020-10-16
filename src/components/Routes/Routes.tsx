import React, { memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CreatePost from '../pages/CreatePost/CreatePost';
import Home from '../pages/Home/components/Home/Home';
import Profile from '../pages/Profile/components/Profile/Profile';
import Settings from '../pages/Settings/Settings';
import SignUp from '../pages/SignUp/SignUp';
import SingIn from '../pages/SignIn/SignIn';
import UserArticle from '../pages/UserArticle/UserArticle';

const Routes = (): JSX.Element => {
  console.count('ROUTES');
  return (
    <Switch>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/signin">
        <SingIn />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
      <Route path="/article/:slug">
        <UserArticle />
      </Route>
      <Route path="/profile/:user">
        <Profile />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Redirect exact from="/" to="/home/feed" />
      <Route path="*">
        <div>Not found</div>
      </Route>
    </Switch>
  );
};

export default memo(Routes);
