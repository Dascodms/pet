import './Tag.scss';

import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';
import { usePage } from '../../Contexts/PageContext';
import { useTab } from '../../Contexts/TabContext';

type Props = {
  tag: string;
  className?: string;
};

const Tag: FC<Props> = ({ tag, className = '' }): JSX.Element => {
  const { tab, setTab } = useTab();
  const { setPage } = usePage();
  const history = useHistory();

  const onClickHandle = () => {
    setTab(tag);
    setPage(0);
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
