import React, { FC, memo } from 'react';

import UserAvatar from '../UserAvatar/UserAvatar';
import UserDate from '../UserDate/UserDate';
import UserName from '../UserName/UserName';

type Props = {
  username: string;
  image: string;
  createdAt: string;
  classNameUserName?: string;
  classNameUserDate?: string;
};

const UserInfo: FC<Props> = ({
  username,
  image,
  createdAt,
  classNameUserDate = '',
  classNameUserName = '',
}) => {
  return (
    <>
      <UserAvatar className="user-avatar__feed" image={image} />
      <div>
        <UserName className={classNameUserName} username={username} />
        <UserDate className={classNameUserDate} date={createdAt} />
      </div>
    </>
  );
};

export default memo(UserInfo);
