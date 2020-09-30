import './Comment.scss';

import { queryCache, useMutation } from 'react-query';

import ArticleUser from '../Article/ArticleUser/ArticleUser';
import { Comment as CommentProps } from './Comment.type';
import DeleteButton from '../DeleteButton/DeleteButton';
import React from 'react';
import { deleteComment } from '../../../services/commentService/commentService';

const Comment: React.FC<CommentProps> = ({
  body,
  author,
  createdAt,
  currentUser,
  id,
  slug,
}): JSX.Element => {
  const { image, username } = author;
  const [mutate] = useMutation(deleteComment, {
    onMutate: ({ slug, id }) => {
      queryCache.cancelQueries(`comments-${slug}`);

      const previousComments = queryCache.getQueryData(`comments-${slug}`);

      queryCache.setQueryData(`comments-${slug}`, (old: CommentProps[]) =>
        old.filter((comment) => comment.id !== id),
      );

      return () =>
        queryCache.setQueryData(`comments-${slug}`, previousComments);
    },
    onError: (rollback: () => void) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries(`comments-${slug}`);
    },
  });

  const handleRemove = () => {
    mutate({ slug, id });
  };

  return (
    <div className="comment">
      <div className="comment__body">{body}</div>
      <div className="comment__wrapper">
        <ArticleUser
          marginTop
          createdAt={createdAt}
          image={image}
          username={username}
        />
        {currentUser === username ? (
          <DeleteButton isLoading={false} onClick={handleRemove} />
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
