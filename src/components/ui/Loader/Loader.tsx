import './Loader.scss';

import React, { FC } from 'react';

const Loader: FC = (): JSX.Element => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
