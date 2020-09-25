import { MutationResultPair, queryCache, useMutation } from 'react-query';

import { Comment } from '../components/ui/Comment/Comment.type';
import { del } from '../api';

export const useDeleteComment = (
  slug: string,
  id: number,
): MutationResultPair<unknown, unknown, { body: string }, unknown> => {
  return useMutation(() => del(`/articles/${slug}/comments/${id}`), {
    onSuccess: () => queryCache.refetchQueries(`comments-${slug}`),
  });
};
