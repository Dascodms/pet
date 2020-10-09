import './CommentList.scss';

import Comment from '../Comment';
import CommentAdd from '../CommentAdd/CommentAdd';
import { CommentListProps } from './CommentList.type';
import Container from '../../Container/Container';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import React from 'react';
import { getComments } from '../../../../services/commentService/commentService';
import { useAuth } from '../../../Contexts/AuthContext';
import { useQuery } from 'react-query';

const CommentList: React.FC<CommentListProps> = ({ slug }): JSX.Element => {
  const { user } = useAuth();
  const { isLoading, data, error } = useQuery(['comments', slug], getComments);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <div className="comment-list__wrapper">
            <div className="comment-list__title">
              {data.length ? `Comment ${data.length}` : 'No comments'}
            </div>
            {!user ? (
              <div>
                <Link to="/signin">Sign in</Link> or{' '}
                <Link to="/signup">sign up</Link>
                to add comments on this article.
              </div>
            ) : (
              <CommentAdd slug={slug} />
            )}
            {data.map((comment) => (
              <Comment
                {...comment}
                currentUser={user?.username}
                key={comment.id}
                slug={slug}
              />
            ))}
          </div>
        </Container>
      )}
    </div>
  );
};

export default CommentList;
