import './CommentAdd.scss';

import React, { FC, useState } from 'react';
import { queryCache, useMutation } from 'react-query';

import Button from '../../Button/Button';
import Textarea from '../../Textarea/Textarea';
import Wrapper from '../../Wrapper/Wrapper';
import { createComment } from '../../../../services/commentService/commentService';
import { useAuth } from '../../../Contexts/AuthContext';

type Props = {
  slug: string;
};

const CommentAdd: FC<Props> = ({ slug }): JSX.Element => {
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
      <Wrapper style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={commentText.trim().length === 0}
          onClick={handleClick}
        >
          Post comment
        </Button>
      </Wrapper>
    </div>
  );
};

export default CommentAdd;
