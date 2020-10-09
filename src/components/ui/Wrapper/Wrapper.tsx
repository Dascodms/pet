import React, { CSSProperties, FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  style: CSSProperties;
};

const Wrapper: FC<Props> = ({ children, style }) => (
  <div style={style}>{children}</div>
);

export default Wrapper;
