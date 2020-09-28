import './UserAvatar.scss';

import { Link } from 'react-router-dom';
import React from 'react';
import { UserAvatarProps } from './UserAvatar.type';

const UserAvatar: React.FC<UserAvatarProps> = ({
  image,
  username,
}): JSX.Element => {
  return (
    <Link
      to={`/profile/${username}`}
      className="user-avatar"
      style={{ backgroundImage: `url(${image})` }}
    ></Link>
  );
};

export default UserAvatar;
