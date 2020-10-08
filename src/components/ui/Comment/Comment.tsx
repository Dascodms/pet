import './Comment.scss';

import React, { FC } from 'react';
import { queryCache, useMutation } from 'react-query';

import { Author } from '../Article/Article.type';
import DeleteButton from '../DeleteButton/DeleteButton';
import Moment from 'react-moment';
import Row from '../Row/Row';
import User from '../User/User';
import UserAvatar from '../User/UserAvatar/UserAvatar';
import { deleteComment } from '../../../services/commentService/commentService';

type Props = {
  id?: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
  currentUser: string;
  slug: string;
};

const Comment: FC<Props> = ({
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
      queryCache.cancelQueries(['comments', slug]);

      const previousComments = queryCache.getQueryData(['comments', slug]);

      queryCache.setQueryData(['comments', slug], (old: Props[]) =>
        old.filter((comment) => comment.id !== id),
      );

      return () =>
        queryCache.setQueryData(['comments', slug], previousComments);
    },
    onError: (rollback: () => void) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries(['comments', slug]);
    },
  });

  const handleRemove = () => {
    mutate({ slug, id });
  };

  return (
    <div className="comment">
      <div className="comment__body">{body}</div>
      <div className="comment__wrapper">
        <Row>
          <UserAvatar
            className="user-avatar__feed"
            username={username}
            image={image}
          />
          <div>
            <User username={username} />
            <Moment format="LL HH:mm">{createdAt}</Moment>
          </div>
        </Row>
        {currentUser === username ? (
          <DeleteButton isLoading={false} onClick={handleRemove} />
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
