import { QueryResult, useQuery } from 'react-query';

import { get } from '../api';
import { useAuth } from '../components/Contexts/AuthContext';

export type User = {
  username: string;
  bio: string;
  image: string;
  email: string;
  id: number;
  token?: string;
  updateAt: string;
  createdAt: string;
};

export function useUser(token: string): QueryResult<User, unknown> {
  const { setUser } = useAuth();
  return useQuery(
    ['user', token],
    async () => {
      const data = await get<{ user: User }>(`/user`);
      setUser(data.user);
      return data.user;
    },
    { enabled: token, refetchOnWindowFocus: false },
  );
}
