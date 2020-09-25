import './Tabs.scss';

import { NavLink } from 'react-router-dom';
import React from 'react';
import { usePage } from '../../Contexts/PageContextComponent';
import { useTab } from '../../Contexts/TabContextComponent';

const Tabs: React.FC = (): JSX.Element => {
  const { tab } = useTab();
  const { setPage } = usePage();

  return (
    <div className="tabs">
      <NavLink
        onClick={() => setPage(0)}
        activeClassName="tabs__tab--active"
        className="tabs__tab"
        to="/home/feed"
      >
        Global Feed
      </NavLink>
      {tab && (
        <NavLink
          onClick={() => setPage(0)}
          activeClassName="tabs__tab--active"
          className="tabs__tab"
          to={`/home/feed-by-tag?tag=${tab}`}
        >
          #{tab}
        </NavLink>
      )}
    </div>
  );
};

export default Tabs;
