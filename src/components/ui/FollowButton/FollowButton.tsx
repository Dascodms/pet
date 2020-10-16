import './FollowButton.scss';

import React, { FC, useEffect } from 'react';

type Props = {
  username: string;
  following: boolean;
  onClick: () => void;
  className?: string;
};

const FollowButton: FC<Props> = ({
  username,
  onClick,
  following,
  className = '',
}): JSX.Element => {
  useEffect(() => console.log('rerender'));
  return (
    <button className={`follow-button ${className}`} onClick={onClick}>
      {following ? 'Unfollow' : 'Follow'} {username}
    </button>
  );
};

export default FollowButton;
