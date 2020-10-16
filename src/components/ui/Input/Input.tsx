import './Input.scss';

import React, { FC } from 'react';

import { FieldError } from 'react-hook-form';

type Props = {
  type: string;
  name: string;
  placeholder: string;
  register: any;
  className?: string;
  error?: FieldError;
  label?: string;
  disabled?: boolean;
};

const Input: FC<Props> = ({
  type,
  name,
  placeholder,
  register,
  error,
  className = '',
  label = '',
  disabled,
}): JSX.Element => {
  return (
    <div className={`input ${className}`}>
      <label>
        {label}
        <input
          disabled={disabled}
          className="input__element"
          ref={register}
          placeholder={placeholder}
          name={name}
          type={type}
        />
      </label>

      {error && <div className="input__error">{error.message}</div>}
    </div>
  );
};

export default Input;
