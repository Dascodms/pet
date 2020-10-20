import './style.scss';

import React, { FC } from 'react';

import { Link } from 'react-router-dom';

type Props = {
  username: string;
  className?: string;
};

const UserName: FC<Props> = ({ className = '', username }) => {
  return (
    <Link to={`/profile/${username}`} className={`username ${className}`}>
      {username}
    </Link>
  );
};

export default UserName;
