import { del, post } from '../../api';

import { Profile } from '../../hooks/useProfile';

export const createComment = async ({
  slug,
  body,
}: {
  slug: string;
  body: string;
}): Promise<Profile> => {
  const url = `/articles/${slug}/comments`;
  const response = post(url, { comment: body });

  return response.profile;
};
