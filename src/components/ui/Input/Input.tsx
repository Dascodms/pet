import './Input.scss';

import React, { FC } from 'react';

type Props = {
  type: string;
  name: string;
  placeholder: string;
  register: any;
  className?: string;
  disabled?: boolean;
};

const Input: FC<Props> = ({
  type,
  name,
  placeholder,
  register,
  className = '',
  disabled,
}): JSX.Element => {
  return (
    <input
      disabled={disabled}
      className={`input ${className}`}
      ref={register}
      placeholder={placeholder}
      name={name}
      type={type}
    />
  );
};

export default Input;
