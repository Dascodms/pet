import './app.scss';

import Header from './Header/Header';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes/Routes';
import { TOKEN_NAME } from '../api';
import { TabProvider } from './Contexts/TabContextComponent';
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
    <Router>
      <TabProvider>
        <Header />
        <Routes />
      </TabProvider>
    </Router>
  );
};

export default App;
