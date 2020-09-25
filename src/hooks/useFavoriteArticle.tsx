import { MutationResultPair, queryCache, useMutation } from 'react-query';
import { del, post } from '../api';

import { Article } from '../components/ui/Article/Article.type';

export const useFavoriteArticle = (
  slug: string,
  favorited: boolean,
): MutationResultPair<Article, unknown, unknown, unknown> => {
  const url = `/articles/${slug}/favorite`;
  return useMutation(() => (favorited ? del(url) : post(url)), {
    onSuccess: () => queryCache.refetchQueries(`articles`),
  });
};
