import './app.scss';

import { AuthProvider, useAuth } from './Contexts/AuthContext';
import React, { useEffect } from 'react';

import Header from './Header/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes/Routes';
import { TOKEN_NAME } from '../api';
import { useUser } from '../hooks/useUser';

const App: React.FC = () => {
  const { setUser } = useAuth();
  const { data: user, error, isLoading } = useUser(
    localStorage.getItem(TOKEN_NAME),
  );

  if (user) {
    setUser(user);
  }

  if (isLoading) return null;

  return (
    <Router>
      <Header />
      <Routes />
    </Router>
  );
};

export default App;
