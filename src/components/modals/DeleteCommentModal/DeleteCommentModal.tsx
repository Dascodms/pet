import '../../../assets/scss/modal.scss';

import {
  Comment,
  DeleteComment,
} from '../../../services/commentService/commentService.types';
import React, { FC } from 'react';
import { queryCache, useMutation } from 'react-query';

import Backdrop from '../../ui/Backdrop/Backdrop';
import Button from '../../ui/Button/Button';
import { ErrorRollback } from '../../../types/error.type';
import Modal from '../Modal/Modal';
import { VscClose } from 'react-icons/vsc';
import Wrapper from '../../ui/Wrapper/Wrapper';
import { deleteComment } from '../../../services/commentService/commentService';

type Props = {
  setShow: (value: boolean) => void;
  slug: string;
  id: number;
};

const DeleteCommentModal: FC<Props> = ({ setShow, slug, id }): JSX.Element => {
  const [mutate, { isLoading }] = useMutation<
    Comment,
    ErrorRollback,
    DeleteComment
  >(deleteComment, {
    onMutate: ({ slug, id }) => {
      queryCache.cancelQueries(['comments', slug]);

      const previousComments = queryCache.getQueryData(['comments', slug]);

      queryCache.setQueryData(['comments', slug], (old: Props[]) =>
        old.filter((comment) => comment.id !== id),
      );

      return () =>
        queryCache.setQueryData(['comments', slug], previousComments);
    },
    onError: (rollback) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries(['comments', slug]);
    },
  });

  return (
    <>
      <Backdrop setShow={setShow} />
      <Modal>
        <Wrapper
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <VscClose
            onClick={() => setShow(false)}
            className="modal__close"
            color="red"
            size="1.2em"
            cursor="pointer"
          />
          <div style={{ marginBottom: '20px' }}>
            You definitely want to delete?
          </div>
          <div>
            <Button
              disabled={isLoading}
              onClick={() => mutate({ slug, id })}
              className="button__delete-modal"
            >
              Yes
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => setShow(false)}
              className="button__delete-modal"
            >
              No
            </Button>
          </div>
        </Wrapper>
      </Modal>
    </>
  );
};

export default DeleteCommentModal;
