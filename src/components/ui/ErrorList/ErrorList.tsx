import './style.scss';

import React, { FC } from 'react';

import { ErrorType } from '../../../types/error.type';

type Props = {
  error: ErrorType;
};

const ErrorList: FC<Props> = ({ error }) => {
  return (
    <ul className="error-list">
      {Object.entries(error.errors).map(([key, value]) => {
        return (
          <li className="error-list__item" key={key}>{`${key} ${value}`}</li>
        );
      })}
    </ul>
  );
};

export default ErrorList;
