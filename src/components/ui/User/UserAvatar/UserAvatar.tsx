import './UserAvatar.scss';

import React, { FC } from 'react';

type Props = {
  image: string;
  className?: string;
};

const UserAvatar: FC<Props> = ({ image, className = '' }): JSX.Element => {
  return (
    <div
      className={`user-avatar ${className}`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    ></div>
  );
};

export default UserAvatar;
