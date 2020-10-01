import React, { useEffect, useState } from 'react';
import { queryCache, usePaginatedQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';

import Article from '../../../ui/Article/Article';
import Loader from '../../../ui/Loader/Loader';
import Paginate from '../../../ui/Paginate/Paginate';
import { ProfileFeedProps } from './ProfileFeed.type';
import { getArticlesByUser } from '../../../../services/articleService/articleService';

const ProfileFeed: React.FC<ProfileFeedProps> = ({
  username,
  setPage,
  page,
}): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
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

  const onPageChange = (page: number) => {
    setPage(page);

    history.push({
      pathname: location.pathname,
      search: page ? `?page=${++page}` : '',
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
      {resolvedData.articles.map((article) => (
        <Article
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

export default ProfileFeed;
