import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Article from '../../ui/Article/Article';
import Loader from '../../ui/Loader/Loader';
import Paginate from '../../ui/Paginate/Paginate';
import QueryString from 'query-string';
import { useArticles } from '../../../hooks/useArticles';
import { usePage } from '../../Contexts/PageContextComponent';

const TagFeed: React.FC = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const { page, setPage } = usePage();
  const { tag } = QueryString.parse(location.search);
  const { isLoading, data, error } = useArticles(page, tag as string);

  const onPageChange = (page: number) => {
    setPage(page);

    history.push({
      pathname: location.pathname,
      search: page ? `?tag=${tag}&page=${++page}` : `?tag=${tag}`,
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

export default TagFeed;
