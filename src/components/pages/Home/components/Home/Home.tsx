import React, { FC } from 'react';

import Container from '../../../../ui/Container/Container';
import HomeRoutes from '../../routes/HomeRoutes';
import HomeTabs from '../HomeTabs/HomeTabs';
import PopularTags from '../../../../ui/Tag/PopularTags/PopularTags';
import QueryString from 'query-string';
import Wrapper from '../../../../ui/Wrapper/Wrapper';
import { useLocation } from 'react-router-dom';
import { usePage } from '../../../../Contexts/PageContext';

const Home: FC = () => {
  const location = useLocation();
  const { setPage } = usePage();

  React.useEffect(() => {
    const { page } = QueryString.parse(location.search);
    const currentPage = page ? +page - 1 : 0;
    setPage(currentPage);
  }, [location]);

  return (
    <Container>
      <Wrapper style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <HomeTabs />
          <HomeRoutes />
        </div>
        <PopularTags />
      </Wrapper>
    </Container>
  );
};

export default React.memo(Home);
