import './style.scss';

import React, { FC } from 'react';

import { Error } from '../../../types/error.type';

type Props = {
  error: Error;
};

const ErrorList: FC<Props> = ({ error }) => {
  return (
    <ul className="error">
      {Object.entries(error.errors).map(([key, value]) => {
        return <li className="error__item" key={key}>{`${key} ${value}`}</li>;
      })}
    </ul>
  );
};

export default ErrorList;
