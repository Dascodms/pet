import React, { ReactNode, useMemo, useState } from 'react';

import { User } from '../../hooks/useUser';

type AuthContextType = {
  user: User;
  setUser: (value: User) => void;
};

const AuthContext = React.createContext<AuthContextType>(undefined);

const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

const AuthProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => {
    return { user, setUser };
  }, [user]);

  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthProvider, useAuth };
