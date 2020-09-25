import './Title.scss';

import React from 'react';
import { TitleProps } from './Title.type';

const Title: React.FC<TitleProps> = ({ title }) => (
  <h1 className="title">{title}</h1>
);

export default Title;
