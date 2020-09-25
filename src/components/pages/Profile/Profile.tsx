import Container from '../../ui/Container/Container';
import Loader from '../../ui/Loader/Loader';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../../hooks/useProfile';

const Profile: React.FC = (): JSX.Element => {
  // TODO create profile logo component
  const { user }: { user: string } = useParams();
  const { data, isLoading } = useProfile(user);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="profile">
      <div className="profile__banner">
        <Container>
          <div>{data.username}</div>
          <div>{data.bio}</div>
        </Container>
      </div>
    </div>
  );
};

export default Profile;
