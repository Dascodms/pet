import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';

type Props = {
  component: React.ComponentType;
};

const PrivateRoute: FC<Props> = ({ component: Component }) => {
  const { user } = useAuth();

  return (
    <Route render={() => (user ? <Component /> : <Redirect to="/signin" />)} />
  );
};

export default PrivateRoute;
