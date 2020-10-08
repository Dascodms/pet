import './User.scss';

import React, { FC } from 'react';

import { Link } from 'react-router-dom';

type Props = {
  username: string;
  className?: string;
};

const User: FC<Props> = ({ className = '', username }): JSX.Element => {
  return (
    <Link to={`/profile/${username}`} className={`user ${className}`}>
      {username}
    </Link>
  );
};

export default User;
