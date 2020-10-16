import './Logo.scss';

import { Link } from 'react-router-dom';
import React from 'react';

const Logo = (): JSX.Element => (
  <Link className="logo" to="/home">
    Blog
  </Link>
);

export default Logo;
