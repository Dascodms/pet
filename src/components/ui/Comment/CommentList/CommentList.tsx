import './CommentList.scss';

import React, { useEffect } from 'react';

import Comment from '../Comment';
import CommentAdd from '../CommentAdd/CommentAdd';
import { CommentListProps } from './CommentList.type';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext';

const CommentList: React.FC<CommentListProps> = ({
  comments,
  slug,
}): JSX.Element => {
  const { user } = useAuth();
  return (
    <div>
      <div className="comment-list__title">
        {comments.length ? `Comment ${comments.length}` : 'No comments'}
      </div>
      {!user ? (
        <div>
          <Link to="/signin">Sign in</Link> or <Link to="/signup">sign up</Link>{' '}
          to add comments on this article.
        </div>
      ) : (
        <CommentAdd slug={slug} />
      )}
      {comments.map((comment) => (
        <Comment
          updatedAt={comment.updatedAt}
          createdAt={comment.createdAt}
          author={comment.author}
          currentUser={user?.username}
          body={comment.body}
          key={comment.id}
          id={comment.id}
          slug={slug}
        />
      ))}
    </div>
  );
};

export default CommentList;
