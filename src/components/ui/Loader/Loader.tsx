import './Loader.scss';

import React from 'react';

const Loader = (): JSX.Element => {
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
