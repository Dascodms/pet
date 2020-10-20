import './style.scss';

import { Link } from 'react-router-dom';
import React from 'react';

const Logo = (): JSX.Element => (
  <Link className="logo" to="/">
    Blog
  </Link>
);

export default Logo;
