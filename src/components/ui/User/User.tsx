import './User.scss';

import { Link } from 'react-router-dom';
import React from 'react';
import { UserProps } from './User.type';

const User: React.FC<UserProps> = ({ username, white }): JSX.Element => {
  return (
    <Link
      to={`/profile/${username}`}
      className={`user ${white ? 'user--white' : ''}`}
    >
      {username}
    </Link>
  );
};

export default User;
