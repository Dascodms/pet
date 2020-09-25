import './FavoriteButton.scss';

import { FavoriteButtonProps } from './FavoriteButton.type';
import React from 'react';
import { RiHeartAddLine } from 'react-icons/ri';

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
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
