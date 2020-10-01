import './CommentAdd.scss';

import React, { useState } from 'react';
import { queryCache, useMutation } from 'react-query';

import ArticleUser from '../../Article/ArticleUser/ArticleUser';
import Button from '../../Button/Button';
import { CommentAddProps } from './CommentAdd.type';
import Textarea from '../../Textarea/Textarea';
import { createComment } from '../../../../services/commentService/commentService';
import { useAuth } from '../../../Contexts/AuthContext';

const CommentAdd: React.FC<CommentAddProps> = ({ slug }): JSX.Element => {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState<string>('');
  const [mutate] = useMutation(createComment, {
    onSuccess: () => {
      queryCache.refetchQueries(['comments', slug]);
    },
  });

  const handleClick = () => {
    setCommentText('');
    mutate({ slug, commentText });
  };

  return (
    <div className="comment-add">
      <Textarea
        onChange={(e: React.FormEvent<EventTarget>) =>
          setCommentText((e.target as HTMLInputElement).value)
        }
        value={commentText}
        placeholder="Write a comment..."
        rows={6}
      />
      <div className="comment-add__wrapper">
        <ArticleUser username={user.username} image={user.image} />
        <Button
          disabled={commentText.trim().length === 0}
          onClick={handleClick}
        >
          Post comment
        </Button>
      </div>
    </div>
  );
};

export default CommentAdd;
