import './Button.scss';

import React, { FC } from 'react';

type Props = {
  submit?: boolean;
  flexEnd?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const Button: FC<Props> = ({
  onClick,
  submit,
  disabled,
  children,
  className = '',
}) => {
  return (
    <>
      {submit ? (
        <button
          disabled={disabled}
          type="submit"
          className={`button ${className}`}
        >
          {children}
        </button>
      ) : (
        <button
          disabled={disabled}
          onClick={() => onClick()}
          className={`button ${className}`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
