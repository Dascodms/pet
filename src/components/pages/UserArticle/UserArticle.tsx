import './UserArticle.scss';

import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import AuthUserButtons from './components/AuthUserButtons/AuthUserButtons';
import Banner from '../../ui/Banner/Banner';
import Button from '../../ui/Button/Button';
import CommentList from '../../ui/Comment/CommentList/CommentList';
import Container from '../../ui/Container/Container';
import DeleteArticleModal from '../../modals/DeleteArticleModal/DeleteArticleModal';
import EditArticleModal from '../../modals/EditModal/EditArticleModal';
import Loader from '../../ui/Loader/Loader';
import Title from '../../ui/Title/Title';
import UserInfo from '../../ui/User/UserInfo/UserInfo';
import Wrapper from '../../ui/Wrapper/Wrapper';
import { getArticle } from '../../../services/articleService/articleService';
import { useQuery } from 'react-query';

const UserArticle: FC = () => {
  const history = useHistory();
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useQuery(['article', slug], getArticle, {
    retry: false,
    onError(err) {
      if (err === 404) {
        history.push('/');
      }
    },
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSetShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleSetShowEditModal = () => {
    setShowEditModal(true);
  };

  return (
    <div className="user-article">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Banner backgroundColor="#333">
            <Container>
              <Wrapper style={{ display: 'flex', flexDirection: 'column' }}>
                <Wrapper
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '20px',
                  }}
                >
                  <UserInfo
                    classNameUserDate="user-date--white"
                    classNameUserName="username--white"
                    username={data.author.username}
                    image={data.author.image}
                    createdAt={data.createdAt}
                  />
                </Wrapper>
                <AuthUserButtons author={data.author.username}>
                  <Button
                    onClick={handleSetShowDeleteModal}
                    className="button__remove"
                  >
                    Delete article
                  </Button>
                  <Button
                    onClick={handleSetShowEditModal}
                    className="button__edit"
                  >
                    Edit article
                  </Button>
                </AuthUserButtons>
              </Wrapper>
            </Container>
          </Banner>
          <Container>
            <Title title={data.title}></Title>
            <div className="user-article__body">{data.body}</div>
          </Container>

          <CommentList slug={slug} />

          {showEditModal ? (
            <EditArticleModal
              slug={data.slug}
              title={data.title}
              body={data.body}
              description={data.description}
              setShow={setShowEditModal}
            />
          ) : null}

          {showDeleteModal ? (
            <DeleteArticleModal
              slug={slug}
              setShowDeleteArticleModal={setShowDeleteModal}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default UserArticle;
