import './Article.scss';

import React, { useState } from 'react';

import ArticleModalTags from './ArticleModalTags/ArticleModalTags';
import { ArticleProps } from './Article.type';
import ArticleUser from './ArticleUser/ArticleUser';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { Link } from 'react-router-dom';
import Tag from '../Tag/Tag';
import { useFavoriteArticle } from '../../../hooks/useFavoriteArticle';

const Article: React.FC<ArticleProps> = ({
  article,
  classes,
  setPage,
}): JSX.Element => {
  const {
    body,
    title,
    slug,
    createdAt,
    description,
    favoritesCount,
    tagList,
    favorited,
    author: { image, username },
  } = article;
  const [showTags, setShowTags] = useState<boolean>(false);
  const [mutate, { isLoading, isIdle }] = useFavoriteArticle(slug, favorited);

  const handleClickFavoriteButton = () => {
    mutate();
  };

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
        <FavoriteButton
          disabled={isLoading}
          favorited={favorited}
          handleClickFavoriteButton={handleClickFavoriteButton}
        >
          <span>{favoritesCount}</span>
        </FavoriteButton>
        {tagList.slice(0, 4).map((tag) => (
          <Tag
            setPage={setPage}
            classes="tag__feed"
            tag={tag}
            key={Math.random() * 1000}
          />
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
