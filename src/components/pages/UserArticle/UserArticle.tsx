import './UserArticle.scss';

import React, { useState } from 'react';

import Banner from '../../ui/Banner/Banner';
import Button from '../../ui/Button/Button';
import CommentList from '../../ui/Comment/CommentList/CommentList';
import Container from '../../ui/Container/Container';
import DeleteArticleModal from '../../modals/DeleteArticleModal/DeleteArticleModal';
import EditArticleModal from '../../modals/EditModal/EditArticleModal';
import Loader from '../../ui/Loader/Loader';
import Moment from 'react-moment';
import Title from '../../ui/Title/Title';
import User from '../../ui/User/User';
import UserAvatar from '../../ui/User/UserAvatar/UserAvatar';
import Wrapper from '../../ui/Wrapper/Wrapper';
import { getArticle } from '../../../services/articleService/articleService';
import { useAuth } from '../../Contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

type UserArticle = {
  body: string;
  createdAt: string;
  title: string;
  username: string;
  image: string;
  slug: string;
};

const UserArticle: React.FC = (): JSX.Element => {
  const {
    state: { slug },
  } = useLocation<{ slug: string }>();
  const { data, isLoading } = useQuery(['article', slug], getArticle);

  const [show, setShow] = useState(false);
  const [showDeleteArticleModal, setShowDeleteArticleModal] = useState(false);

  const { user: authUser } = useAuth();

  return (
    <div className="user-article">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Banner backgroundColor="#333">
            <Container>
              <Wrapper style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 className="user-article__title"></h1>
                <Wrapper
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '20px',
                  }}
                >
                  <UserAvatar
                    className="user-avatar__feed"
                    username={data.author.username}
                    image={data.author.image}
                  />
                  <div>
                    <User
                      className="user--white"
                      username={data.author.username}
                    />
                    <Moment className="user-article--white" format="LL HH:mm">
                      {}
                    </Moment>
                  </div>
                </Wrapper>
                {authUser.username === data.author.username ? (
                  <Wrapper
                    style={{
                      display: 'flex',
                      alignSelf: 'flex-end',
                      justifyContent: 'space-between',
                      width: '220px',
                    }}
                  >
                    <Button
                      onClick={() => setShowDeleteArticleModal(true)}
                      className="button__remove"
                    >
                      Delete article
                    </Button>
                    <Button
                      onClick={() => setShow(true)}
                      className="button__edit"
                    >
                      Edit article
                    </Button>
                  </Wrapper>
                ) : null}
              </Wrapper>
            </Container>
          </Banner>
          <Container>
            <Title title={data.title}></Title>
            <div className="user-article__body">{data.body}</div>
          </Container>

          <CommentList slug={slug} />
        </div>
      )}
      {show ? (
        <EditArticleModal
          slug={data.slug}
          title={data.title}
          body={data.body}
          description={data.description}
          setShow={setShow}
        />
      ) : null}

      {showDeleteArticleModal ? (
        <DeleteArticleModal
          slug={slug}
          setShowDeleteArticleModal={setShowDeleteArticleModal}
        />
      ) : null}
    </div>
  );
};

export default UserArticle;
