import './PopularTags.scss';

import Loader from '../../ui/Loader/Loader';
import React from 'react';
import Tag from '../../ui/Tag/Tag';
import { useTags } from '../../../hooks/useTags';

const PopularTags: React.FC = (): JSX.Element => {
  const { isLoading, data, error } = useTags();

  return (
    <div className="tags">
      {isLoading ? (
        <Loader />
      ) : (
        data.map((tag) => (
          <Tag
            classes="tag__popular"
            key={Date.now() + Math.random() * 1000}
            tag={tag}
          />
        ))
      )}
    </div>
  );
};

export default React.memo(PopularTags);
