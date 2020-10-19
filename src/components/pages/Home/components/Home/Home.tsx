import React, { FC } from 'react';

import Container from '../../../../ui/Container/Container';
import HomeRoutes from '../../routes/HomeRoutes';
import HomeTabs from '../HomeTabs/HomeTabs';
import PopularTags from '../../../../ui/Tag/PopularTags/PopularTags';
import Wrapper from '../../../../ui/Wrapper/Wrapper';
import { usePage } from '../../../../Contexts/PageContext';
import { useTab } from '../../../../Contexts/TabContext';

type Props = {
  location: Location;
};

const Home: FC<Props> = ({ location }) => {
  const { setPage } = usePage();
  const { setTab, tab } = useTab();

  React.useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = query.get('page');
    const tag = query.get('tag');

    setPage(page ? +page - 1 : 0);
    setTab(tag ? tag : tab);
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
