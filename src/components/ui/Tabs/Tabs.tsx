import './Tabs.scss';

import { NavLink, useRouteMatch } from 'react-router-dom';

import React from 'react';
import { TabsProps } from './Tabs.type';
import { useAuth } from '../../Contexts/AuthContext';
import { useTab } from '../../Contexts/TabContext';

const Tabs: React.FC<TabsProps> = ({ setPage }): JSX.Element => {
  const { tab } = useTab();
  const { user } = useAuth();
  const { url } = useRouteMatch();

  return (
    <div className="tabs">
      {user && (
        <NavLink
          onClick={() => setPage(0)}
          activeClassName="tabs__tab--active"
          className="tabs__tab"
          to={`${url}/your-feed`}
        >
          Your feed
        </NavLink>
      )}
      <NavLink
        onClick={() => setPage(0)}
        activeClassName="tabs__tab--active"
        className="tabs__tab"
        to={`${url}/feed`}
      >
        Global Feed
      </NavLink>
      {tab && (
        <NavLink
          onClick={() => setPage(0)}
          activeClassName="tabs__tab--active"
          className="tabs__tab"
          to={`${url}/feed-by-tag?tag=${tab}`}
        >
          #{tab}
        </NavLink>
      )}
    </div>
  );
};

export default Tabs;
