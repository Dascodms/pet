import React, { useEffect } from 'react';

import Container from '../../ui/Container/Container';
import HomeRoutes from './Routes/HomeRoutes';
import PopularTags from '../../ui/Tag/PopularTags/PopularTags';
import QueryString from 'query-string';
import Tabs from '../../ui/Tabs/Tabs';
import Wrapper from '../../ui/Wrapper/Wrapper';
import { usePage } from '../../Contexts/PageContext';

const Home = (): JSX.Element => {
  const { setPage } = usePage();

  useEffect(() => {
    const { page } = QueryString.parse(location.search);
    const currentPage = page ? +page - 1 : 0;
    setPage(currentPage);
  }, []);

  return (
    <Container>
      <Wrapper style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Tabs />
          <HomeRoutes />
        </div>
        <PopularTags />
      </Wrapper>
    </Container>
  );
};

export default React.memo(Home);
