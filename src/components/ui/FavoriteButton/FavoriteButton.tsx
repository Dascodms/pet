import './FavoriteButton.scss';

import React, { FC, ReactNode } from 'react';

import { RiHeartAddLine } from 'react-icons/ri';

type Props = {
  onClick: () => void;
  children: ReactNode;
  favorited: boolean;
  disabled: boolean;
};

const FavoriteButton: FC<Props> = ({
  children,
  onClick,
  favorited,
  disabled,
}): JSX.Element => {
  return (
    <button disabled={disabled} onClick={onClick} className="favorite">
      <RiHeartAddLine size="1.5em" color={favorited ? '#5cb85c' : '#808080'} />
      {children}
    </button>
  );
};

export default FavoriteButton;
