import { Redirect, Route, Switch } from 'react-router-dom';

import CreatePost from '../pages/CreatePost/CreatePost';
import Home from '../pages/Home/Home';
import Profile from '../pages/Profile/Profile';
import React from 'react';
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
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/article/:user">
        <UserArticle />
      </Route>
      <Route path="/profile/:user">
        <Profile />
      </Route>
    </Switch>
  );
};

export default Routes;
