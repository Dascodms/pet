import './Comment.scss';

import React, { useEffect } from 'react';

import ArticleUser from '../Article/ArticleUser/ArticleUser';
import { Comment as CommentProps } from './Comment.type';
import DeleteButton from '../DeleteButton/DeleteButton';
import { MdDeleteForever } from 'react-icons/md';
import { useDeleteComment } from '../../../hooks/useDeleteComment';

const Comment: React.FC<CommentProps> = ({
  body,
  author,
  createdAt,
  currentUser,
  id,
  slug,
}): JSX.Element => {
  const { image, username } = author;
  const [mutate, { isLoading }] = useDeleteComment(slug, id);

  useEffect(() => console.log(id));
  const handleRemove = () => {
    mutate();
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
          <DeleteButton isLoading={isLoading} onClick={handleRemove} />
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
