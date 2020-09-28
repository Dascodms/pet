import './Profile.scss';

import Banner from '../../ui/Banner/Banner';
import Container from '../../ui/Container/Container';
import Loader from '../../ui/Loader/Loader';
import React from 'react';
import User from '../../ui/User/User';
import UserAvatar from '../../ui/User/UserAvatar/UserAvatar';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../../hooks/useProfile';

const Profile: React.FC = (): JSX.Element => {
  const { user }: { user: string } = useParams();
  const { data, isLoading } = useProfile(user);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="profile">
      <Banner backgroundColor="#333">
        <Container>
          <div className="profile__wrapper">
            <UserAvatar
              marginBottom="10px"
              size={{ width: '90px', height: '90px' }}
              username={data.username}
              image={data.image}
            />
            <User white username={data.username} />
            <div>{data.bio}</div>
          </div>
        </Container>
      </Banner>
    </div>
  );
};

export default Profile;
