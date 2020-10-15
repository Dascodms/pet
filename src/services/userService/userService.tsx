import { get, put } from '../../api';

import { User } from '../../hooks/useUser';

export const getCurrentUser = async (): Promise<User> => {
  const response = await get<{ user: User }>(`/user`);
  return response.user;
};

export const updateUser = async (body: any): Promise<User> => {
  const response = await put<{ user: User }>(`/user`, {
    user: body,
  });

  return response.user;
};
