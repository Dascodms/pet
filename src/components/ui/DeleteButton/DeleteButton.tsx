import { DeleteButtonProps } from './DeleteButton.type';
import { MdDeleteForever } from 'react-icons/md';
import React from 'react';

const DeleteButton: React.FC<DeleteButtonProps> = ({ isLoading, onClick }) => {
  return (
    <MdDeleteForever
      onClick={onClick}
      color={isLoading ? 'grey' : 'red'}
      size="1.5em"
      cursor="pointer"
      className={`${isLoading ? 'comment__remove--loading' : ''}`}
    />
  );
};

export default DeleteButton;
