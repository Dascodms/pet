import './Article.scss';

import { Article, ArticleApi } from './Article.type';
import React, { FC, useState } from 'react';
import { queryCache, useMutation } from 'react-query';

import ArticleModalTags from './ArticleModalTags/ArticleModalTags';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Row from '../Row/Row';
import Tag from '../Tag/Tag';
import User from '../User/User';
import UserAvatar from '../User/UserAvatar/UserAvatar';
import { favoriteArticle } from '../../../services/favoriteService/favoriteService';

type Props = {
  article: Article;
  classes: string;
  setPage: (page: number) => void;
  queryKey?: string;
};

const ArticleCard: FC<Props> = ({
  article,
  classes,
  setPage,
  queryKey,
}): JSX.Element => {
  const {
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
            slug,
          },
        }}
      >
        <div className="article__title">{title}</div>
        <div className="article__description">{description}</div>
        <button className="article__more link">Read more...</button>
      </Link>
      <Row className="row--mt-20">
        <UserAvatar
          className="user-avatar__feed"
          username={username}
          image={image}
        />
        <div>
          <User username={username} />
          <Moment format="LL HH:mm">{createdAt}</Moment>
        </div>
      </Row>
      <div className="article__wrapper">
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
            className="tag__feed"
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
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
