import { useHistory, useLocation } from 'react-router-dom';

import Article from '../../ui/Article/Article';
import { FeedPage } from '../../../global-types/Feed.type';
import Loader from '../../ui/Loader/Loader';
import Paginate from '../../ui/Paginate/Paginate';
import React from 'react';
import { useArticlesFeed } from '../../../hooks/useArticlesFeed';

const YourFeed: React.FC<FeedPage> = ({ page, setPage }): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const { isLoading, data, error } = useArticlesFeed(page);

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
      {data.articlesCount ? (
        data.articles.map((article) => (
          <Article
            setPage={setPage}
            key={article.updatedAt}
            article={article}
            classes="article--mb20"
          />
        ))
      ) : (
        <div>{"You don't have any published articles"}</div>
      )}
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

export default YourFeed;
