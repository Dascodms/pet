import './style.scss';

import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

type Props = {
  url: string;
  exact?: boolean;
};

const Tab: FC<Props> = ({ url, children, exact = false }) => (
  <NavLink exact={exact} activeClassName="tab--active" className="tab" to={url}>
    {children}
  </NavLink>
);

export default Tab;
