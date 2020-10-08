import './Row.scss';

import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const Row: FC<Props> = ({ children, className = '' }): JSX.Element => (
  <div className={`row ${className}`}>{children}</div>
);

export default Row;
