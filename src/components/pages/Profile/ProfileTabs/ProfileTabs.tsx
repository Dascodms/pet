import { NavLink, useRouteMatch } from 'react-router-dom';

import { ProfileTabsProps } from './ProfileTabs.type';
import React from 'react';

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  username,
  setPage,
}): JSX.Element => {
  const { url, path } = useRouteMatch();

  console.log(path, url);
  console.log(location);
  return (
    <div className="tabs">
      <NavLink
        onClick={() => setPage(0)}
        activeClassName="tabs__tab--active"
        className="tabs__tab"
        exact
        to={url}
      >
        {username} Articles
      </NavLink>

      <NavLink
        onClick={() => setPage(0)}
        activeClassName="tabs__tab--active"
        className="tabs__tab"
        to={`${url}/favorite`}
      >
        Favorited Articles
      </NavLink>
    </div>
  );
};

export default ProfileTabs;
