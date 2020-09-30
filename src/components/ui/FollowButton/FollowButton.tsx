import './FollowButton.scss';

import { FollowButtonProps } from './FollowButton.type';
import React from 'react';

const FollowButton: React.FC<FollowButtonProps> = ({
  username,
  handleClick,
  following,
  classes,
}): JSX.Element => {
  return (
    <button
      className={`follow-button ${classes ? classes : ''}`}
      onClick={handleClick}
    >
      {following ? 'Unfollow' : 'Follow'} {username}
    </button>
  );
};

export default FollowButton;
