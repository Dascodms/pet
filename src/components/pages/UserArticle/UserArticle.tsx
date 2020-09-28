import './UserArticle.scss';

import React, { useEffect } from 'react';

import ArticleUser from '../../ui/Article/ArticleUser/ArticleUser';
import CommentList from '../../ui/Comment/CommentList/CommentList';
import Container from '../../ui/Container/Container';
import Loader from '../../ui/Loader/Loader';
import { useComments } from '../../../hooks/useComments';
import { useLocation } from 'react-router-dom';

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
  const { isLoading, data, error, isFetched } = useComments(slug);

  useEffect(() => {
    console.log(isLoading, data, isFetched);
  });

  return (
    <div className="user-article">
      <div className="user-article__banner">
        <Container>
          <div className="user-article__banner">
            <h1 className="user-article__title">{title}</h1>
            <ArticleUser
              image={image}
              username={username}
              createdAt={createdAt}
              whiteUsername
            />
          </div>
        </Container>
      </div>
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
