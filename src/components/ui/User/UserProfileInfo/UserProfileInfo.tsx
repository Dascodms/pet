import React from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import UserBiography from '../UserBiography/UserBiography';
import UserName from '../UserName/UserName';
import { useProfile } from '../../../Contexts/ProfileContext';

const UserProfileInfo = (): JSX.Element => {
  const { profile } = useProfile();

  return (
    <>
      <UserAvatar
        className="user-avatar--size-middle user-avatar--mb-10"
        image={profile.image}
      />
      <UserName className="username--white" username={profile.username} />
      <UserBiography
        className="user-biography--white"
        biography={profile.bio}
      />
    </>
  );
};

export default UserProfileInfo;
