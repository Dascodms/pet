import './Input.scss';

import { InputProps } from './Input.type';
import React from 'react';

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  register,
  error,
  classes,
}): JSX.Element => {
  return (
    <div className={`input ${classes}`}>
      <label>
        <input
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
