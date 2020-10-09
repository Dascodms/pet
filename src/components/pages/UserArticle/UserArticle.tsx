import './UserArticle.scss';

import React, { useState } from 'react';
import {
  deleteArticle,
  getArticle,
} from '../../../services/articleService/articleService';
import { useHistory, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import Banner from '../../ui/Banner/Banner';
import Button from '../../ui/Button/Button';
import CommentList from '../../ui/Comment/CommentList/CommentList';
import Container from '../../ui/Container/Container';
import EditModal from '../../modals/EditModal/EditModal';
import Loader from '../../ui/Loader/Loader';
import Moment from 'react-moment';
import Row from '../../ui/Row/Row';
import Title from '../../ui/Title/Title';
import User from '../../ui/User/User';
import UserAvatar from '../../ui/User/UserAvatar/UserAvatar';
import { useAuth } from '../../Contexts/AuthContext';

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
  const history = useHistory();
  const { data, isLoading } = useQuery(['article', slug], getArticle);
  const [mutate, { isLoading: isLoadingDelete }] = useMutation(deleteArticle, {
    onSuccess() {
      history.push('/');
    },
  });
  const [show, setShow] = useState(false);
  const { user: authUser } = useAuth();

  return (
    <div className="user-article">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Banner backgroundColor="#333">
            <Container>
              <div className="user-article__wrapper">
                <h1 className="user-article__title"></h1>
                <Row>
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
                </Row>
                {authUser.username === data.author.username ? (
                  <div className="user-article__buttons">
                    <Button
                      disabled={isLoadingDelete}
                      onClick={() => mutate(slug)}
                      classes="button__remove"
                    >
                      Delete article
                    </Button>
                    <Button
                      disabled={isLoadingDelete}
                      onClick={() => setShow(true)}
                      classes="button__edit"
                    >
                      Edit article
                    </Button>
                  </div>
                ) : null}
              </div>
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
        <EditModal
          slug={data.slug}
          title={data.title}
          body={data.body}
          description={data.description}
          setShow={setShow}
        />
      ) : null}
    </div>
  );
};

export default UserArticle;
