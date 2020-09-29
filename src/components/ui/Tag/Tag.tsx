import './Tag.scss';

import { NavLink } from 'react-router-dom';
import React from 'react';
import { TagProps } from './Tag.type';
import { useTab } from '../../Contexts/TabContextComponent';

const Tag: React.FC<TagProps> = ({ tag, classes, setPage }): JSX.Element => {
  const { tab, setTab } = useTab();

  const onClickHandle = () => {
    setPage(0);
    setTab(tag);
  };

  return (
    <NavLink
      to={`/home/feed-by-tag?tag=${tag}`}
      onClick={onClickHandle}
      className={`tag ${tab === tag ? 'tag__active' : ''} ${
        classes ? classes : ''
      }`}
    >
      {tag}
    </NavLink>
  );
};

export default Tag;
