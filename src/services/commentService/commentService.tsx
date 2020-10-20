import { Comment, CreateComment, DeleteComment } from './commentService.types';
import { del, get, post } from '../../api';

const url = `/articles/`;

export const getComments = async (
  key: string,
  slug: string,
): Promise<Comment[]> => {
  console.log(slug);
  const response = await get<{ comments: Comment[] }>(`${url}${slug}/comments`);
  return response.comments;
};

export const createComment = async ({
  slug,
  commentText,
}: CreateComment): Promise<Comment> => {
  const response = await post<{ comment: Comment }>(`${url}${slug}/comments`, {
    comment: {
      body: commentText,
    },
  });

  return response.comment;
};

export const deleteComment = async ({
  slug,
  id,
}: DeleteComment): Promise<Comment> => {
  const response = await del<{ comment: Comment }>(
    `${url}${slug}/comments/${id}`,
  );
  return response.comment;
};
