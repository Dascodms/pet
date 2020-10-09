import { del, post } from '../../api';

import { Profile } from '../../components/pages/Profile/Profile.type';

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
