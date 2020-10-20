import './style.scss';

import React, { FC, memo } from 'react';

type Props = {
  title: string;
};

const Title: FC<Props> = ({ title }) => <h1 className="title">{title}</h1>;

export default memo(Title);
