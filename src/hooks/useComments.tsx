import { QueryResult, useQuery } from 'react-query';

import { Comment } from '../components/ui/Comment/Comment.type';
import { get } from '../api';

export function useComments(slug: string): QueryResult<Comment[], unknown> {
  return useQuery(`comments-${slug}`, async () => {
    const url = `/articles/${slug}/comments`;
    const data = await get<{ comments: Comment[] }>(url);
    return data.comments;
  });
}
