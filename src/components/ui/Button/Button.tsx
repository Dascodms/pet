import './Button.scss';

import React, { FC } from 'react';

type Props = {
  submit?: boolean;
  flexEnd?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  classes?: string;
};

const Button: FC<Props> = ({
  onClick,
  submit,
  disabled,
  flexEnd,
  children,
  classes,
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
          className={`button ${flexEnd ? 'button--flex-end' : ''} ${
            classes ? classes : ''
          } `}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
