import Button from '../../../../ui/Button/Button';
import FollowButton from '../../../../ui/FollowButton/FollowButton';
import React from 'react';
import { useAuth } from '../../../../Contexts/AuthContext';
import { useFollowStatusMutation } from '../../../../../hooks/useFollowStatusMutation';
import { useHistory } from 'react-router-dom';
import { useProfile } from '../../../../Contexts/ProfileContext';

const ProfileButtons = (): JSX.Element => {
  const history = useHistory();
  const { user } = useAuth();
  const {
    profile: { username, following },
  } = useProfile();
  const [mutate] = useFollowStatusMutation(username);

  const handleChangeFollowStatus = () => {
    mutate({ username, following });
  };

  return (
    <>
      {user.username !== username ? (
        <FollowButton
          className="follow-button__profile"
          following={following}
          onClick={handleChangeFollowStatus}
          username={username}
        />
      ) : (
        <Button
          onClick={() => history.push('/settings')}
          className="button__profile"
        >
          Edit Profile Settings
        </Button>
      )}
    </>
  );
};

export default ProfileButtons;
