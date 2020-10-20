import React, { FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Banner from '../../../../ui/Banner/Banner';
import Container from '../../../../ui/Container/Container';
import Loader from '../../../../ui/Loader/Loader';
import ProfileButtons from '../ProfileButtons/ProfileButtons';
import ProfileRoutes from '../../routes/ProfileRoutes';
import ProfileTabs from '../ProfileTabs/ProfileTabs';
import UserProfileInfo from '../../../../ui/User/UserProfileInfo/UserProfileInfo';
import Wrapper from '../../../../ui/Wrapper/Wrapper';
import { getProfile } from '../../../../../services/profileService/profileService';
import { useAuth } from '../../../../Contexts/AuthContext';
import { usePage } from '../../../../Contexts/PageContext';
import { useProfile } from '../../../../Contexts/ProfileContext';
import { useQuery } from 'react-query';

const Profile: FC = () => {
  const { setProfile } = useProfile();
  const { user } = useParams<{ user: string }>();
  const { setPage } = usePage();
  const location = useLocation();
  const { user: authUser } = useAuth();

  const { isLoading } = useQuery(['profile', user], getProfile, {
    onSuccess(response) {
      setProfile(response);
    },
  });

  React.useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = query.get('page');

    setPage(page ? +page - 1 : 0);
  }, [location]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="profile">
      <Banner backgroundColor="#333">
        <Container>
          <Wrapper
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <UserProfileInfo />
            {authUser ? <ProfileButtons /> : null}
          </Wrapper>
        </Container>
      </Banner>
      <Container>
        <Wrapper
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ProfileTabs />
          <ProfileRoutes />
        </Wrapper>
      </Container>
    </div>
  );
};

export default Profile;
