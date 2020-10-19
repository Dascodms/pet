import React, { useCallback } from 'react';
import { queryCache, usePaginatedQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';

import ArticleCard from '../../../../ui/Article/ArticleCard';
import Loader from '../../../../ui/Loader/Loader';
import Paginate from '../../../../ui/Paginate/Paginate';
import { getArticles } from '../../../../../services/articleService/articleService';
import { useFavoriteStatusMutation } from '../../../../../hooks/useFavoriteStatusMutation';
import { usePage } from '../../../../Contexts/PageContext';

const GlobalFeed: React.FC = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const { page } = usePage();
  const queryKey = ['articles-global', page];
  const { isLoading, resolvedData, error } = usePaginatedQuery(
    queryKey,
    getArticles,
  );
  const [mutate] = useFavoriteStatusMutation(
    queryCache.getQuery(queryKey).queryKey,
  );

  const onPageChange = useCallback(
    (page: number) => {
      history.push({
        pathname: location.pathname,
        search: page ? `?page=${++page}` : '',
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    [page],
  );

  const handleChangeFavoriteStatus = (slug: string, favorited: boolean) => {
    mutate({ slug, favorited });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {resolvedData.articles.map((article) => (
        <ArticleCard
          handleFavoriteStatus={handleChangeFavoriteStatus}
          key={article.updatedAt}
          article={article}
          className="article--mb20"
        />
      ))}
      {isLoading || resolvedData.articlesCount <= 10 ? null : (
        <Paginate
          count={resolvedData.articlesCount / 10}
          page={page}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default GlobalFeed;
