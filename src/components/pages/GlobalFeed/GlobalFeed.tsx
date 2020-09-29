import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Article from '../../ui/Article/Article';
import { FeedPage } from '../../../global-types/Feed.type';
import Loader from '../../ui/Loader/Loader';
import Paginate from '../../ui/Paginate/Paginate';
import { useArticles } from '../../../hooks/useArticles';

const GlobalFeed: React.FC<FeedPage> = ({ page, setPage }): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const { isLoading, data, error } = useArticles(page);

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
          key={article.updatedAt}
          article={article}
          classes="article--mb20"
        />
      ))}
      {isLoading ? null : (
        <Paginate
          count={data.articlesCount / 10}
          page={page}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default GlobalFeed;
