import { QueryResult, useQuery } from 'react-query';

import { get } from '../api';

export function useTags(): QueryResult<string[], unknown> {
  return useQuery('tags', async () => {
    const data = await get<{ tags: string[] }>(`/tags`);
    return data.tags;
  });
}
