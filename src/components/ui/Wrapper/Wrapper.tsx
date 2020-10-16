import React, { CSSProperties, FC, ReactNode, memo } from 'react';

type Props = {
  style: CSSProperties;
  children: ReactNode;
};

const Wrapper: FC<Props> = ({ children, style }) => (
  <div style={style}>{children}</div>
);

export default memo(Wrapper);
