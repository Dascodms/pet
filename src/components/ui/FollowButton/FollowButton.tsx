import './FollowButton.scss';

import React, { FC } from 'react';

type Props = {
  username: string;
  following: boolean;
  handleClick: () => void;
  className?: string;
};

const FollowButton: FC<Props> = ({
  username,
  handleClick,
  following,
  className = '',
}): JSX.Element => {
  return (
    <button className={`follow-button ${className}`} onClick={handleClick}>
      {following ? 'Unfollow' : 'Follow'} {username}
    </button>
  );
};

export default FollowButton;
