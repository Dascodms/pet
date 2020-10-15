import React, { useCallback, useEffect, useState } from 'react';
import { queryCache, usePaginatedQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';

import ArticleCard from '../../../../ui/Article/ArticleCard';
import Loader from '../../../../ui/Loader/Loader';
import Paginate from '../../../../ui/Paginate/Paginate';
import QueryString from 'query-string';
import { getArticlesByTag } from '../../../../../services/articleService/articleService';
import { usePage } from '../../../../Contexts/PageContext';
import { useTab } from '../../../../Contexts/TabContext';

const TagFeed: React.FC = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const { page, setPage } = usePage();
  const { tab, setTab } = useTab();
  const [queryKey, setQueryKey] = useState(null);
  const { isLoading, resolvedData, error } = usePaginatedQuery(
    ['articles-tag', page, tab],
    getArticlesByTag,
  );

  console.count('TAGFEED');

  useEffect(() => {
    const { tag } = QueryString.parse(location.search);
    setTab(tag as string);
  }, []);

  useEffect(() => {
    setQueryKey(queryCache.getQuery(['articles-tag', page, tab]).queryKey);
  }, [page, tab]);

  const onPageChange = useCallback(
    (page: number) => {
      setPage(page);

      history.push({
        pathname: location.pathname,
        search: page ? `?tag=${tab}&page=${++page}` : `?tag=${tab}`,
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    [page, tab],
  );

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {resolvedData.articles.map((article) => (
        <ArticleCard
          key={article.updatedAt}
          article={article}
          className="article--mb20"
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
