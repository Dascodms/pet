import './style.scss';

import React from 'react';
import Tab from '../../../../ui/Tab/Tab';
import { useProfile } from '../../../../Contexts/ProfileContext';
import { useRouteMatch } from 'react-router-dom';

const ProfileTabs: React.FC = (): JSX.Element => {
  const { url } = useRouteMatch();
  const { profile } = useProfile();

  return (
    <div className="profile-tabs">
      <Tab exact url={url}>
        {profile.username} Articles
      </Tab>
      <Tab url={`${url}/favorite`}> Favorited Articles</Tab>
    </div>
  );
};

export default ProfileTabs;
