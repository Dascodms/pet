import './style.scss';

import React, { FC } from 'react';

import Tag from '../../Tag/Tag';

type Props = {
  setShowTags: (arg: boolean) => void;
  title: string;
  tags: string[];
};

const ArticleModalTags: FC<Props> = ({
  setShowTags,
  title,
  tags,
}): JSX.Element => {
  return (
    <div onMouseLeave={() => setShowTags(false)} className="article__tags">
      <div className="article-modal-tags__title">
        Tags in the article {title}
      </div>
      {tags.map((tag) => (
        <Tag tag={tag} key={Math.random() * 1000} />
      ))}
    </div>
  );
};

export default ArticleModalTags;
