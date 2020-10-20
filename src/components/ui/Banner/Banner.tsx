import './style.scss';

import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  backgroundColor: string;
};

const Banner: FC<Props> = ({ children, backgroundColor }): JSX.Element => (
  <div style={{ backgroundColor }} className="banner">
    {children}
  </div>
);

export default Banner;
