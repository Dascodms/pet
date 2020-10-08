import './FavoriteButton.scss';

import React, { FC, ReactNode } from 'react';

import { RiHeartAddLine } from 'react-icons/ri';

type Props = {
  handleClickFavoriteButton: () => void;
  children: ReactNode;
  favorited: boolean;
  disabled: boolean;
};

const FavoriteButton: FC<Props> = ({
  children,
  handleClickFavoriteButton,
  favorited,
  disabled,
}): JSX.Element => {
  return (
    <button
      disabled={disabled}
      onClick={handleClickFavoriteButton}
      className="favorite"
    >
      <RiHeartAddLine size="1.5em" color={favorited ? '#5cb85c' : '#808080'} />
      {children}
    </button>
  );
};

export default FavoriteButton;
