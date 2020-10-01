import React, { useEffect, useState } from 'react';
import { queryCache, usePaginatedQuery, useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';

import Article from '../../ui/Article/Article';
import { FeedPage } from '../../../global-types/Feed.type';
import Loader from '../../ui/Loader/Loader';
import Paginate from '../../ui/Paginate/Paginate';
import { getArticlesByFeed } from '../../../services/articleService/articleService';

const YourFeed: React.FC<FeedPage> = ({ page, setPage }): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const [queryKey, setQueryKey] = useState(null);
  const { isLoading, resolvedData, error } = usePaginatedQuery(
    ['articles-feed', page],
    getArticlesByFeed,
  );

  useEffect(() => {
    setQueryKey(queryCache.getQuery(['articles-feed', page]).queryKey);
  }, [page]);

  const onPageChange = (page: number) => {
    setPage(page);

    history.push({
      pathname: location.pathname,
      search: page ? `/feed&page=${++page}` : `/feed`,
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {resolvedData.articlesCount ? (
        resolvedData.articles.map((article) => (
          <Article
            setPage={setPage}
            key={article.updatedAt}
            article={article}
            classes="article--mb20"
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
