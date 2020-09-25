import './Button.scss';

import React, { useEffect } from 'react';

import { ButtonProps } from './Button.type';

const Button: React.FC<ButtonProps> = (props) => {
  useEffect(() => {
    console.log(props.disabled);
  });
  return (
    <input
      onClick={() => props.onClick()}
      className={`button ${props.classes}`}
      {...props}
    />
  );
};

export default Button;
