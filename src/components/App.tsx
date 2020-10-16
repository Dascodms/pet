import './app.scss';

import Header from './ui/Header/Header';
import { ProfileProvider } from './Contexts/ProfileContext';
import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
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
      <TabProvider>
        <Header />
        <ProfileProvider>
          <Routes />
        </ProfileProvider>
      </TabProvider>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
};

export default App;
