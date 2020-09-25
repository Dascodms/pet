import './Container.scss';

import React, { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  classes?: string;
};

const Container: React.FC<ContainerProps> = ({ children, classes }) => {
  return (
    <div className={`container ${classes ? classes : ''}`}>{children}</div>
  );
};

export default Container;
