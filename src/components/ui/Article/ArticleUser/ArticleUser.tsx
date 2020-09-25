import './ArticleUser.scss';

import { ArticleUserProps } from '../Article.type';
import Moment from 'react-moment';
import React from 'react';

const ArticleUser: React.FC<ArticleUserProps> = ({
  image,
  username,
  createdAt,
  articlePage,
  isComment,
}) => {
  return (
    <div
      className={`article-user__flex ${
        isComment ? 'article-user__comment' : ''
      }`}
    >
      <div
        className="article-user__img"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div>
        <div
          className={`article-user__author ${
            articlePage ? 'article-user__author--white' : ''
          }`}
        >
          {username}
        </div>
        {createdAt ? (
          <Moment className="article-user__date" format="LL HH:mm">
            {createdAt}
          </Moment>
        ) : null}
      </div>
    </div>
  );
};

export default ArticleUser;
