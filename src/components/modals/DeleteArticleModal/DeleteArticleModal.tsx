import '../../../assets/scss/modal.scss';

import React, { FC } from 'react';

import Backdrop from '../../ui/Backdrop/Backdrop';
import Button from '../../ui/Button/Button';
import Modal from '../Modal/Modal';
import { VscClose } from 'react-icons/vsc';
import Wrapper from '../../ui/Wrapper/Wrapper';
import { deleteArticle } from '../../../services/articleService/articleService';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';

type Props = {
  setShowDeleteArticleModal: (value: boolean) => void;
  slug: string;
};

const DeleteArticleModal: FC<Props> = ({ setShowDeleteArticleModal, slug }) => {
  const history = useHistory();
  const [mutate, { isLoading }] = useMutation(deleteArticle, {
    onSuccess() {
      history.push('/home');
    },
  });

  return (
    <>
      <Backdrop setShow={setShowDeleteArticleModal} />

      <Modal>
        <Wrapper
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <VscClose
            onClick={() => setShowDeleteArticleModal(false)}
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
              onClick={() => mutate(slug)}
              className="button__delete-modal"
            >
              Yes
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => setShowDeleteArticleModal(false)}
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

export default DeleteArticleModal;
