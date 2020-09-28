import './Button.scss';

import { ButtonProps } from './Button.type';
import React from 'react';

const Button: React.FC<ButtonProps> = ({
  onClick,
  submit,
  disabled,
  flexEnd,
  children,
}) => {
  return (
    <>
      {submit ? (
        <button
          disabled={disabled}
          type="submit"
          className={`button ${flexEnd ? 'button--flex-end' : ''}`}
        >
          {children}
        </button>
      ) : (
        <button
          disabled={disabled}
          onClick={() => onClick()}
          className={`button ${flexEnd ? 'button--flex-end' : ''}`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
