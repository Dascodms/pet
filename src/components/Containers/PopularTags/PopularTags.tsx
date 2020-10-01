import './PopularTags.scss';

import Loader from '../../ui/Loader/Loader';
import { PopularTagsProps } from './PopularTags.type';
import React from 'react';
import Tag from '../../ui/Tag/Tag';
import { getTags } from '../../../services/tagsService/tagsService';
import { useQuery } from 'react-query';

const PopularTags: React.FC<PopularTagsProps> = ({ setPage }): JSX.Element => {
  const { isLoading, data, error } = useQuery('tags', getTags, {
    refetchOnWindowFocus: false,
  });

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
            setPage={setPage}
          />
        ))
      )}
    </div>
  );
};

export default React.memo(PopularTags);
