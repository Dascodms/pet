import './Home.scss';

import React, { useState } from 'react';
import { Redirect, Route, useRouteMatch } from 'react-router-dom';

import Container from '../../ui/Container/Container';
import GlobalFeed from '../GlobalFeed/GlobalFeed';
import PopularTags from '../../Containers/PopularTags/PopularTags';
import QueryString from 'query-string';
import Tabs from '../../ui/Tabs/Tabs';
import TagFeed from '../TagFeed/TagFeed';
import YourFeed from '../YourFeed/YourFeed';

const Home = (): JSX.Element => {
  const { path } = useRouteMatch();
  const [page, setPage] = useState<number>(() => {
    const { page } = QueryString.parse(location.search);
    return +page - 1;
  });

  return (
    <Container>
      <div className="home">
        <div>
          <Tabs setPage={setPage} />
          <Route exact path={`${path}/feed`}>
            <GlobalFeed page={page} setPage={setPage} />
          </Route>
          <Route exact path={`${path}/feed-by-tag`}>
            <TagFeed page={page} setPage={setPage} />
          </Route>
          <Route exact path={`${path}/your-feed`}>
            <YourFeed page={page} setPage={setPage} />
          </Route>
          <Route exact path={`${path}`}>
            <Redirect to={`${path}/feed`} />
          </Route>
        </div>
        <PopularTags setPage={setPage} />
      </div>
    </Container>
  );
};

export default Home;
