import React from 'react';
import { HeaderWrapperProps } from './HeaderWrapper.type';

const HeaderWrapper = ({
  classes,
  children,
}: React.PropsWithChildren<HeaderWrapperProps>): JSX.Element => (
  <div className={classes}>{children}</div>
);

export default HeaderWrapper;
