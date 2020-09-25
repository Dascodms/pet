import { QueryResult, useQuery } from 'react-query';

import { get } from '../api';

export type Profile = {
  username: string;
  bio: string;
  image: string;
  following: false;
};

export function useProfile(username: string): QueryResult<Profile, unknown> {
  return useQuery([`profiles-${username}`], async () => {
    const data = await get<{ profile: Profile }>(`/profiles/${username}`);
    return data.profile;
  });
}
