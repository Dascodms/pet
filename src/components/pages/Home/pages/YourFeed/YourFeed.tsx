import React, { useCallback, useEffect, useState } from 'react';
import { queryCache, usePaginatedQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';

import ArticleCard from '../../../../ui/Article/ArticleCard';
import Loader from '../../../../ui/Loader/Loader';
import Paginate from '../../../../ui/Paginate/Paginate';
import { getArticlesByFeed } from '../../../../../services/articleService/articleService';
import { usePage } from '../../../../Contexts/PageContext';

const YourFeed: React.FC = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const { page, setPage } = usePage();
  const [queryKey, setQueryKey] = useState(null);
  const { isLoading, resolvedData, error } = usePaginatedQuery(
    ['articles-feed', page],
    getArticlesByFeed,
  );

  useEffect(() => {
    setQueryKey(queryCache.getQuery(['articles-feed', page]).queryKey);
  }, [page]);

  const onPageChange = useCallback(
    (page: number) => {
      setPage(page);

      history.push({
        pathname: location.pathname,
        search: page ? `page=${++page}` : '',
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    [page],
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {resolvedData.articlesCount ? (
        resolvedData.articles.map((article) => (
          <ArticleCard
            key={article.updatedAt}
            article={article}
            className="article--mb20"
            queryKey={queryKey}
          />
        ))
      ) : (
        <div>{"You don't have any published articles"}</div>
      )}
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

export default YourFeed;
