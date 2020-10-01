import './UserArticle.scss';

import { useHistory, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import ArticleUser from '../../ui/Article/ArticleUser/ArticleUser';
import Banner from '../../ui/Banner/Banner';
import Button from '../../ui/Button/Button';
import CommentList from '../../ui/Comment/CommentList/CommentList';
import Container from '../../ui/Container/Container';
import Loader from '../../ui/Loader/Loader';
import React from 'react';
import { deleteArticle } from '../../../services/articleService/articleService';
import { getComments } from '../../../services/commentService/commentService';
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
    state: {
      userArticle: { title, username, body, createdAt, image, slug },
    },
  } = useLocation<{ userArticle: UserArticle }>();
  const history = useHistory();
  const { isLoading, data, error } = useQuery(['comments', slug], getComments);
  const [mutate, { isLoading: isLoadingDelete }] = useMutation(deleteArticle, {
    onSuccess() {
      history.push('/');
    },
  });
  const { user: authUser } = useAuth();

  return (
    <div className="user-article">
      <Banner backgroundColor="#333">
        <Container>
          <div className="user-article__wrapper">
            <h1 className="user-article__title">{title}</h1>
            <ArticleUser
              image={image}
              username={username}
              createdAt={createdAt}
              whiteUsername
            />
            {authUser.username === username ? (
              <Button
                disabled={isLoadingDelete}
                onClick={() => mutate(slug)}
                classes="button__remove button__flex-end"
              >
                Delete article
              </Button>
            ) : null}
          </div>
        </Container>
      </Banner>
      <Container>
        <div className="user-article__body">{body}</div>
        <div className="user-article__comments">
          {isLoading ? <Loader /> : <CommentList slug={slug} comments={data} />}
        </div>
      </Container>
    </div>
  );
};

export default UserArticle;
