import './Article.scss';

import { ArticleApi, ArticleProps } from './Article.type';
import React, { useState } from 'react';
import { queryCache, useMutation } from 'react-query';

import ArticleModalTags from './ArticleModalTags/ArticleModalTags';
import ArticleUser from './ArticleUser/ArticleUser';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { Link } from 'react-router-dom';
import Tag from '../Tag/Tag';
import { favoriteArticle } from '../../../services/favoriteService/favoriteService';

const Article: React.FC<ArticleProps> = ({
  article,
  classes,
  setPage,
  queryKey,
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
  const [mutate] = useMutation(favoriteArticle, {
    onMutate: ({ slug, favorited }) => {
      queryCache.cancelQueries(queryKey);

      const previousArticles = queryCache.getQueryData(queryKey);

      queryCache.setQueryData(
        queryKey,
        ({ articles, articlesCount }: ArticleApi) => {
          return {
            articlesCount,
            articles: articles.map((article) => {
              if (article.slug === slug) {
                return {
                  ...article,
                  favorited: !favorited,
                  favoritesCount: !favorited
                    ? article.favoritesCount + 1
                    : article.favoritesCount - 1,
                };
              }
              return article;
            }),
          };
        },
      );

      return () => queryCache.setQueryData(queryKey, previousArticles);
    },
    onError: (rollback: () => void) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries(queryKey);
    },
  });

  const handleClickFavoriteButton = () => {
    mutate({ slug, favorited });
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
          disabled={false}
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
