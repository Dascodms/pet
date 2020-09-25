import { MutationResultPair, queryCache, useMutation } from 'react-query';

import { Comment } from '../components/ui/Comment/Comment.type';
import { post } from '../api';

export const useCreateComment = (
  slug: string,
): MutationResultPair<Comment, unknown, { body: string }, unknown> => {
  return useMutation(
    (body) => post(`/articles/${slug}/comments`, { comment: body }),
    {
      onSuccess: () => queryCache.refetchQueries(`comments-${slug}`),
    },
  );
};
