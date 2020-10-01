import './app.scss';

import Header from './Header/Header';
import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes/Routes';
import { TOKEN_NAME } from '../api';
import { TabProvider } from './Contexts/TabContext';
import { useAuth } from './Contexts/AuthContext';
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
    <>
      <Router>
        <TabProvider>
          <Header />
          <Routes />
        </TabProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
};

export default App;