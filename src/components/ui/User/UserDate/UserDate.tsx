import './UserDate.scss';

import * as dayjs from 'dayjs';

import React, { FC } from 'react';

type Props = {
  date: string;
  className?: string;
};

const UserDate: FC<Props> = ({ date, className = '' }) => (
  <div className={`user-date ${className}`}>
    {dayjs(date).format('MMMM D, YYYY HH:mm')}
  </div>
);
export default UserDate;
