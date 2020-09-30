import { useHistory, useLocation } from 'react-router-dom';

import Article from '../../../ui/Article/Article';
import Loader from '../../../ui/Loader/Loader';
import Paginate from '../../../ui/Paginate/Paginate';
import { ProfileFeedProps } from './ProfileFeed.type';
import React from 'react';
import { useArticlesProfileFeed } from '../../../../hooks/useArticlesProfileFeed';

const ProfileFeed: React.FC<ProfileFeedProps> = ({
  username,
  setPage,
  page,
}): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const { isLoading, data, error } = useArticlesProfileFeed(page, username);

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
      {data.articles.map((article) => (
        <Article
          setPage={setPage}
          key={article.updatedAt}
          article={article}
          classes="article--mb20"
        />
      ))}
      {isLoading || data.articlesCount <= 10 ? null : (
        <Paginate
          count={data.articlesCount / 10}
          page={page}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default ProfileFeed;
