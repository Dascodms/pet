import { QueryKey, queryCache, useMutation } from 'react-query';

import { ArticleApi } from '../components/ui/Article/Article.type';
import { favoriteArticle } from '../services/favoriteService/favoriteService';

export function useFavoriteStatusMutation(queryKey: QueryKey) {
  return useMutation(favoriteArticle, {
    onMutate: ({ slug, favorited }) => {
      queryCache.cancelQueries(queryKey);
      const previousArticles = queryCache.getQueryData(queryKey);

      queryCache.setQueryData(
        queryKey,
        ({ articles, articlesCount }: ArticleApi) => {
          return {
            articlesCount,
            articles: articles.map((article) => {
              if (article.slug === slug) {
                return {
                  ...article,
                  favorited: !favorited,
                  favoritesCount: !favorited
                    ? article.favoritesCount + 1
                    : article.favoritesCount - 1,
                };
              }
              return article;
            }),
          };
        },
      );

      return () => queryCache.setQueryData(queryKey, previousArticles);
    },
    onError: (rollback: () => void) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries(queryKey);
    },
  });
}
