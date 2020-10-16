import React, { ReactNode, useMemo, useState } from 'react';

import { Profile } from '../pages/Profile/Profile.type';

type ProfileContextType = {
  profile: Profile;
  setProfile: (profile: Profile) => void;
};

const ProfileContext = React.createContext<ProfileContextType>(undefined);

const useProfile = (): ProfileContextType => {
  const context = React.useContext(ProfileContext);
  if (!context) {
    throw new Error(`useTab must be used within a TabProvider`);
  }
  return context;
};

const ProfileProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [profile, setProfile] = useState<Profile>(null);

  const value = useMemo(() => {
    return { profile, setProfile };
  }, [profile]);

  return <ProfileContext.Provider value={value} {...props} />;
};

export { ProfileProvider, useProfile };
