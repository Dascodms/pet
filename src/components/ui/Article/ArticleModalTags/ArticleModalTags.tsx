import '../Article.scss';
import './ArticleModalTags.scss';

import { ArticleModalTagsProps } from '../Article.type';
import React from 'react';
import Tag from '../../Tag/Tag';

const ArticleModalTags: React.FC<ArticleModalTagsProps> = ({
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
