import './style.scss';

import React, { FC } from 'react';

import { FieldError } from 'react-hook-form';

type Props = {
  error: FieldError;
  className?: string;
  style?: React.CSSProperties;
};

const Error: FC<Props> = ({ error, style, className = '' }) => {
  return (
    <div style={style} className={`error ${className}`}>
      {error.message}
    </div>
  );
};

export default Error;
