import React, { useCallback, useEffect, useState } from 'react';
import { queryCache, usePaginatedQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';

import ArticleCard from '../../../../ui/Article/ArticleCard';
import Loader from '../../../../ui/Loader/Loader';
import Paginate from '../../../../ui/Paginate/Paginate';
import { getArticlesByUser } from '../../../../../services/articleService/articleService';
import { usePage } from '../../../../Contexts/PageContext';
import { useProfile } from '../../../../Contexts/ProfileContext';

const ProfileFeed: React.FC = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const { page, setPage } = usePage();
  const {
    profile: { username },
  } = useProfile();

  const [queryKey, setQueryKey] = useState(null);
  const { isLoading, resolvedData, error } = usePaginatedQuery(
    ['articles-profile', page, username],
    getArticlesByUser,
  );

  useEffect(() => {
    setQueryKey(
      queryCache.getQuery(['articles-profile', page, username]).queryKey,
    );
  }, [page, username]);

  const onPageChange = useCallback(
    (page: number) => {
      setPage(page);

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
        <div>No articles</div>
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

export default ProfileFeed;
