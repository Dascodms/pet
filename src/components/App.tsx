import './app.scss';

import React, { useEffect } from 'react';

import Header from './ui/Header/Header';
import { ProfileProvider } from './Contexts/ProfileContext';
import { ReactQueryDevtools } from 'react-query-devtools';
import Routes from './Routes/Routes';
import { TOKEN_NAME } from '../api';
import { TabProvider } from './Contexts/TabContext';
import { useAuth } from './Contexts/AuthContext';
import { useUser } from '../hooks/useUser';

const App: React.FC = () => {
  const { setUser } = useAuth();
  const { data, isLoading } = useUser(localStorage.getItem(TOKEN_NAME));

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, []);

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

export default React.memo(App);
