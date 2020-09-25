import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Article from '../../ui/Article/Article';
import Loader from '../../ui/Loader/Loader';
import Paginate from '../../ui/Paginate/Paginate';
import { useArticles } from '../../../hooks/useArticles';
import { usePage } from '../../Contexts/PageContextComponent';

const GlobalFeed: React.FC = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const { page, setPage } = usePage();
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
