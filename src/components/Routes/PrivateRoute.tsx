import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';

const PrivateRoute: FC = ({ children }) => {
  const { user } = useAuth();

  return <Route render={() => (user ? children : <Redirect to="/signin" />)} />;
};

export default PrivateRoute;
