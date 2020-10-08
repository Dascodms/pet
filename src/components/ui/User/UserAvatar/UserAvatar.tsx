import './UserAvatar.scss';

import React, { FC } from 'react';

import { Link } from 'react-router-dom';

type Props = {
  image: string;
  username: string;
  className?: string;
};

const UserAvatar: FC<Props> = ({
  image,
  username,
  className = '',
}): JSX.Element => {
  return (
    <Link
      to={`/profile/${username}`}
      className={`user-avatar ${className}`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    ></Link>
  );
};

export default UserAvatar;
