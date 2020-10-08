import React, { useCallback, useEffect, useState } from 'react';
import { queryCache, usePaginatedQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';

import ArticleCard from '../../ui/Article/ArticleCard';
import { FeedPage } from '../../../global-types/Feed.type';
import Loader from '../../ui/Loader/Loader';
import Paginate from '../../ui/Paginate/Paginate';
import QueryString from 'query-string';
import { getArticlesByTag } from '../../../services/articleService/articleService';

const TagFeed: React.FC<FeedPage> = ({ page, setPage }): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const [queryKey, setQueryKey] = useState(null);
  const { tag } = QueryString.parse(location.search);
  const { isLoading, resolvedData, error } = usePaginatedQuery(
    ['articles-tag', page, tag],
    getArticlesByTag,
  );

  useEffect(() => {
    setQueryKey(queryCache.getQuery(['articles-tag', page, tag]).queryKey);
  }, [page, tag]);

  const onPageChange = useCallback(
    (page: number) => {
      setPage(page);

      history.push({
        pathname: location.pathname,
        search: page ? `?tag=${tag}&page=${++page}` : `?tag=${tag}`,
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    [page],
  );

  useEffect(() => {
    console.log(page);
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {resolvedData.articles.map((article) => (
        <ArticleCard
          setPage={setPage}
          key={article.updatedAt}
          article={article}
          classes="article--mb20"
          queryKey={queryKey}
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

export default TagFeed;
