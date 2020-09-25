import { ReactNode } from 'react';

export type FavoriteButtonProps = {
  handleClickFavoriteButton: () => void;
  children: ReactNode;
  favorited: boolean;
  disabled: boolean;
};
