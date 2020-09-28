import './UserAvatar.scss';

import { Link } from 'react-router-dom';
import React from 'react';
import { UserAvatarProps } from './UserAvatar.type';

const UserAvatar: React.FC<UserAvatarProps> = ({
  image,
  username,
  size,
  marginRight,
  marginBottom,
}): JSX.Element => {
  return (
    <Link
      to={`/profile/${username}`}
      className={`user-avatar `}
      style={{
        marginRight,
        marginBottom,
        backgroundImage: `url(${image})`,
        ...size,
      }}
    ></Link>
  );
};

export default UserAvatar;
