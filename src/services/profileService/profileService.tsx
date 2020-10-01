import { Profile } from '../../components/pages/Profile/Profile.type';
import { get } from '../../api';

export const getProfile = async (
  key: string,
  username: string,
): Promise<Profile> => {
  const response = await get<{ profile: Profile }>(`/profiles/${username}`);
  return response.profile;
};
