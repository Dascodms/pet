import './Tag.scss';

import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';
import { useTab } from '../../Contexts/TabContext';

type Props = {
  tag: string;
  className?: string;
  setPage: (page: number) => void;
};

const Tag: FC<Props> = ({ tag, setPage, className = '' }): JSX.Element => {
  const { tab, setTab } = useTab();

  const onClickHandle = () => {
    setPage(0);
    setTab(tag);
  };

  return (
    <NavLink
      to={`/home/feed-by-tag?tag=${tag}`}
      onClick={onClickHandle}
      className={`tag ${tab === tag ? 'tag__active' : ''} ${className}
      }`}
    >
      {tag}
    </NavLink>
  );
};

export default Tag;
