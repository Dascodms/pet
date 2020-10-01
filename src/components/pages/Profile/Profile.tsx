import './Profile.scss';

import React, { useState } from 'react';
import { Route, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { queryCache, useMutation, useQuery } from 'react-query';

import Banner from '../../ui/Banner/Banner';
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
import { followUser } from '../../../services/followService/followService';
import { getProfile } from '../../../services/profileService/profileService';

const Profile: React.FC = (): JSX.Element => {
  const { user }: { user: string } = useParams();
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
            <FollowButton
              classes="follow-button__profile"
              following={data.following}
              handleClick={handleClick}
              username={data.username}
            />
          </div>
        </Container>
      </Banner>
      <Container>
        <ProfileTabs setPage={setPage} username={data.username} />
        <Route exact path={path}>
          <ProfileFeed setPage={setPage} page={page} username={data.username} />
        </Route>
        <Route exact path={`${path}/favorite`}>
          <ProfileFavoritedFeed
            setPage={setPage}
            page={page}
            username={data.username}
          />
        </Route>
      </Container>
    </div>
  );
};

export default Profile;
