import { queryCache, useMutation } from 'react-query';

import { followUser } from '../services/followService/followService';

//TODO TYPE MUTATE FUNC

export function useFollowStatusMutation(user: string) {
  return useMutation(followUser, {
    onMutate: (profile) => {
      queryCache.cancelQueries(['profile', user]);

      const previousProfile = queryCache.getQueryData(['profile', user]);

      queryCache.setQueryData(['profile', user], (old: any) => {
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
}
