import { QueryResult, useQuery } from 'react-query';

import { ArticleApi } from '../components/ui/Article/Article.type';
import { get } from '../api';

export function useArticles(
  page: number,
  tag?: string,
): QueryResult<ArticleApi, unknown> {
  return useQuery(['articles', page, tag], async () => {
    const url = tag
      ? `/articles?tag=${tag}&limit=10&offset=${page ? page * 10 : 0}`
      : `/articles?limit=10&offset=${page ? page * 10 : 0}`;
    const data = await get<ArticleApi>(url);
    return data;
  });
}
