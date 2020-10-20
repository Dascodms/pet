import './style.scss';

import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';
import { useTab } from '../../Contexts/TabContext';

type Props = {
  tag: string;
  className?: string;
};

const Tag: FC<Props> = ({ tag, className = '' }): JSX.Element => {
  const { tab } = useTab();
  const history = useHistory();

  const onClickHandle = () => {
    history.push(`/home/feed-by-tag?tag=${tag}`);
  };

  return (
    <div
      onClick={onClickHandle}
      className={`tag ${tab === tag ? 'tag__active' : ''} ${className}
      }`}
    >
      {tag}
    </div>
  );
};

export default Tag;
