import './Home.scss';

import { Redirect, Route, useRouteMatch } from 'react-router-dom';

import Container from '../../ui/Container/Container';
import GlobalFeed from '../GlobalFeed/GlobalFeed';
import { PageProvider } from '../../Contexts/PageContextComponent';
import PopularTags from '../../Containers/PopularTags/PopularTags';
import React from 'react';
import { TabProvider } from '../../Contexts/TabContextComponent';
import Tabs from '../../ui/Tabs/Tabs';
import TagFeed from '../TagFeed/TagFeed';

const Home = (): JSX.Element => {
  const { path } = useRouteMatch();

  return (
    <TabProvider>
      <PageProvider>
        <Container>
          <div className="home">
            <div>
              <Tabs />
              <Route exact path={`${path}/feed`}>
                <GlobalFeed />
              </Route>
              <Route exact path={`${path}/feed-by-tag`}>
                <TagFeed />
              </Route>
              <Route exact path={`${path}`}>
                <Redirect to={`${path}/feed`} />
              </Route>
            </div>
            <PopularTags />
          </div>
        </Container>
      </PageProvider>
    </TabProvider>
  );
};

export default Home;
