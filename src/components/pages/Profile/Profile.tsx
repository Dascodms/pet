import React, { useState } from 'react';
import { Route, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { queryCache, useMutation, useQuery } from 'react-query';

import Banner from '../../ui/Banner/Banner';
import Button from '../../ui/Button/Button';
import Container from '../../ui/Container/Container';
import FollowButton from '../../ui/FollowButton/FollowButton';
import Loader from '../../ui/Loader/Loader';
import ProfileFavoritedFeed from './ProfileFavoritedFeed/ProfileFavoritedFeed';
import ProfileFeed from './ProfileFeed/ProfileFeed';
import ProfileTabs from './ProfileTabs/ProfileTabs';
import { Profile as ProfileType } from './Profile.type';
import QueryString from 'query-string';
import User from '../../ui/User/User';
import UserAvatar from '../../ui/User/UserAvatar/UserAvatar';
import Wrapper from '../../ui/Wrapper/Wrapper';
import { followUser } from '../../../services/followService/followService';
import { getProfile } from '../../../services/profileService/profileService';
import { useAuth } from '../../Contexts/AuthContext';

const Profile: React.FC = (): JSX.Element => {
  const { user }: { user: string } = useParams();
  const { user: authUser } = useAuth();
  const { path } = useRouteMatch();
  const location = useLocation();
  const [page, setPage] = useState<number>(() => {
    const { page } = QueryString.parse(location.search);
    return +page - 1;
  });
  const { data, isLoading } = useQuery(['profile', user], getProfile);

  const [mutate] = useMutation(followUser, {
    onMutate: (profile) => {
      queryCache.cancelQueries(['profile', user]);

      const previousProfile = queryCache.getQueryData(['profile', user]);

      queryCache.setQueryData(['profile', user], (old: ProfileType) => {
        const { following } = profile;
        return { ...old, following: !following };
      });

      return () => queryCache.setQueryData(['profile', user], previousProfile);
    },
    onError: (rollback: () => void) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries(['profile', user]);
    },
  });

  const handleClick = (): void => {
    const { username, following } = data;
    mutate({ username, following });
  };

  if (isLoading) {
    return <Loader />;
  }
  // history push settings page
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
            <UserAvatar
              className="user-avatar--size-middle user-avatar--mb-10"
              username={data.username}
              image={data.image}
            />
            <User className="user--white" username={data.username} />
            <div>{data.bio}</div>
            {authUser.username !== user ? (
              <FollowButton
                className="follow-button__profile"
                following={data.following}
                handleClick={handleClick}
                username={data.username}
              />
            ) : (
              <Button
                onClick={() => console.log('hai')}
                className="button__profile"
              >
                Edit Profile Settings
              </Button>
            )}
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
          <ProfileTabs setPage={setPage} username={data.username} />
          <Route exact path={path}>
            <ProfileFeed
              setPage={setPage}
              page={page}
              username={data.username}
            />
          </Route>
          <Route exact path={`${path}/favorite`}>
            <ProfileFavoritedFeed
              setPage={setPage}
              page={page}
              username={data.username}
            />
          </Route>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Profile;
