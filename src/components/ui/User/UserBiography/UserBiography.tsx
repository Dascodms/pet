import './style.scss';

import React, { FC } from 'react';

type Props = {
  biography: string;
  className?: string;
};

const UserBiography: FC<Props> = ({ biography, className = '' }) => (
  <div className={`user-biography ${className}`}>{biography}</div>
);

export default UserBiography;
