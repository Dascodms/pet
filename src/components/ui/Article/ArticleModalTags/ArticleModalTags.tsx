import '../Article.scss';
import './ArticleModalTags.scss';

import React, { FC } from 'react';

import Tag from '../../Tag/Tag';

type Props = {
  setShowTags: (arg: boolean) => void;
  title: string;
  tags: string[];
  setPage: (page: number) => void;
};

const ArticleModalTags: FC<Props> = ({
  setShowTags,
  title,
  tags,
  setPage,
}): JSX.Element => {
  return (
    <div onMouseLeave={() => setShowTags(false)} className="article__tags">
      <div className="article-modal-tags__title">
        Tags in the article {title}
      </div>
      {tags.map((tag) => (
        <Tag setPage={setPage} tag={tag} key={Math.random() * 1000} />
      ))}
    </div>
  );
};

export default ArticleModalTags;
