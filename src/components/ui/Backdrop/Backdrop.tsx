import './style.scss';

import React, { FC } from 'react';

type Props = {
  setShow: (value: boolean) => void;
};

const Backdrop: FC<Props> = ({ setShow }) => (
  <div onClick={() => setShow(false)} className="backdrop"></div>
);

export default Backdrop;
