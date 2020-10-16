import './style.scss';

import React, { FC } from 'react';

import Tab from '../../../../ui/Tab/Tab';
import { useAuth } from '../../../../Contexts/AuthContext';
import { useTab } from '../../../../Contexts/TabContext';

const HomeTabs: FC = () => {
  const { tab } = useTab();
  const { user } = useAuth();

  return (
    <div className="home-tabs">
      {user && <Tab url={'/home/your-feed'}>Your feed</Tab>}
      <Tab url={'/home/feed'}> Global Feed</Tab>
      {tab && <Tab url={`/home/feed-by-tag?tag=${tab}`}>#{tab}</Tab>}
    </div>
  );
};

export default HomeTabs;
