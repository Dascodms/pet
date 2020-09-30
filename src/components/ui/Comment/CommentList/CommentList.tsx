import './CommentList.scss';

import Comment from '../Comment';
import CommentAdd from '../CommentAdd/CommentAdd';
import { CommentListProps } from './CommentList.type';
import { Link } from 'react-router-dom';
import React from 'react';
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
          <Link to="/signin">Sign in</Link> or <Link to="/signup">sign up</Link>
          to add comments on this article.
        </div>
      ) : (
        <CommentAdd slug={slug} />
      )}
      {comments.map((comment) => (
        <Comment
          {...comment}
          currentUser={user?.username}
          key={comment.id}
          slug={slug}
        />
      ))}
    </div>
  );
};

export default CommentList;
