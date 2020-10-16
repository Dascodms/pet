import React, { FC, memo } from 'react';

import { Link } from 'react-router-dom';

type Props = {
  slug: string;
  title: string;
  description: string;
};

const ArticleInfo: FC<Props> = ({ slug, title, description }) => {
  return (
    <Link
      to={{
        pathname: `/article/${slug}`,
      }}
    >
      <div className="article__title">{title}</div>
      <div className="article__description">{description}</div>
      <button className="article__more link">Read more...</button>
    </Link>
  );
};

export default memo(ArticleInfo);
