import './style.scss';

import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const Container: FC<Props> = ({ children, className = '' }) => {
  return <div className={`container ${className}`}>{children}</div>;
};

export default Container;
