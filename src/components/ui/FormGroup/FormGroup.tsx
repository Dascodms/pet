import './style.scss';

import React, { FC } from 'react';

type Props = {
  className?: string;
};

const FormGroup: FC<Props> = ({ children, className = '' }) => {
  return <div className={`form-group ${className}`}>{children}</div>;
};

export default FormGroup;
