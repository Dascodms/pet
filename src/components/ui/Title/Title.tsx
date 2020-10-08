import './Title.scss';

import React, { FC } from 'react';

type Props = {
  title: string;
};

const Title: FC<Props> = ({ title }) => <h1 className="title">{title}</h1>;

export default Title;
