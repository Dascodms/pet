import './Article.scss';

import React, { useState } from 'react';

import ArticleModalTags from './ArticleModalTags/ArticleModalTags';
import { ArticleProps } from './Article.type';
import ArticleUser from './ArticleUser/ArticleUser';
import { Link } from 'react-router-dom';
import { RiHeartAddLine } from 'react-icons/ri';
import Tag from '../Tag/Tag';

const Article: React.FC<ArticleProps> = ({ article, classes }): JSX.Element => {
  const [showTags, setShowTags] = useState<boolean>(false);

  const {
    body,
    title,
    slug,
    createdAt,
    description,
    favoritesCount,
    tagList,
    author: { image, username },
  } = article;

  return (
    <div className={`article ${classes ? classes : null}`}>
      <Link
        to={{
          pathname: `/article/${article.author.username}`,
          state: {
            userArticle: {
              username,
              title,
              body,
              createdAt,
              image,
              slug,
            },
          },
        }}
      >
        <div className="article__title">{title}</div>
        <div className="article__description">{description}</div>
        <button className="article__more link">Read more...</button>
      </Link>
      <div className="article__wrapper">
        <ArticleUser username={username} image={image} createdAt={createdAt} />
        <div className="article__icon">
          <RiHeartAddLine size="1.5em" color="grey" />
          <span>{favoritesCount}</span>
        </div>
        {tagList.slice(0, 4).map((tag) => (
          <Tag classes="tag__feed" tag={tag} key={Math.random() * 1000} />
        ))}
        {tagList.length > 4 && (
          <button onMouseMove={() => setShowTags(true)}>More...</button>
        )}
        {showTags && (
          <ArticleModalTags
            tags={tagList}
            title={title}
            setShowTags={setShowTags}
          />
        )}
      </div>
    </div>
  );
};

export default Article;
