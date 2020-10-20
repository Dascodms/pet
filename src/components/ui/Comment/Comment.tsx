import './Comment.scss';

import React, { FC, useCallback, useState } from 'react';

import { Author } from '../Article/Article.type';
import DeleteButton from '../DeleteButton/DeleteButton';
import DeleteCommentModal from '../../modals/DeleteCommentModal/DeleteCommentModal';
import UserInfo from '../User/UserInfo/UserInfo';
import Wrapper from '../Wrapper/Wrapper';

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
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);

  const handleRemove = useCallback(() => {
    setShowDeleteCommentModal(true);
  }, []);

  return (
    <div className="comment">
      <div className="comment__body">{body}</div>
      <Wrapper
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <Wrapper
          style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}
        >
          <UserInfo username={username} image={image} createdAt={createdAt} />
        </Wrapper>
        {currentUser === username ? (
          <DeleteButton isLoading={false} onClick={handleRemove} />
        ) : null}
      </Wrapper>
      {showDeleteCommentModal ? (
        <DeleteCommentModal
          id={id}
          slug={slug}
          setShow={setShowDeleteCommentModal}
        />
      ) : null}
    </div>
  );
};

export default Comment;
