import { QueryResult, useQuery } from 'react-query';

import { ArticleApi } from '../components/ui/Article/Article.type';
import { get } from '../api';

export function useArticlesProfileFavoritedFeed(
  page: number,
  username: string,
): QueryResult<ArticleApi, unknown> {
  return useQuery('articles', async () => {
    const url = `/articles?favorited=${username}&limit=10&offset=${
      page ? page * 10 : 0
    }`;
    const data = await get<ArticleApi>(url);
    return data;
  });
}
