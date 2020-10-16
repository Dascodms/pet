import './PopularTags.scss';

import React, { FC } from 'react';

import Loader from '../../Loader/Loader';
import Tag from '../Tag';
import { getTags } from '../../../../services/tagsService/tagsService';
import { useQuery } from 'react-query';

const PopularTags: FC = (): JSX.Element => {
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
            className="tag__popular"
            key={Date.now() + Math.random() * 1000}
            tag={tag}
          />
        ))
      )}
    </div>
  );
};

export default React.memo(PopularTags);
