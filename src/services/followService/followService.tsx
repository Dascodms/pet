import { del, post } from '../../api';

import { Profile } from '../../hooks/useProfile';

export const followUser = async ({
  username,
  following,
}: {
  username: string;
  following: boolean;
}): Promise<Profile> => {
  const url = `/profiles/${username}/follow`;
  const response = following
    ? await del<{ profile: Profile }>(url)
    : await post<{ profile: Profile }>(url);

  return response.profile;
};
