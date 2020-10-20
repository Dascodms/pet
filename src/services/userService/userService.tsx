import { get, put } from '../../api';

import { Error } from '../../types/error.type';
import { User } from '../../hooks/useUser';

export const getCurrentUser = async (): Promise<User> => {
  const response = await get<{ user: User }>(`/user`);
  return response.user;
};

export const updateUser = async (body: any): Promise<User> => {
  const response = await put<{ user: User }>(`/user`, {
    user: body,
  });

  console.log(response);

  return response.user;
};
