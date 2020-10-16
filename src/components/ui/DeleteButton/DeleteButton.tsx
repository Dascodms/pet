import React, { FC, useEffect } from 'react';

import { MdDeleteForever } from 'react-icons/md';

type Props = {
  isLoading?: boolean;
  onClick: () => void;
};

const DeleteButton: FC<Props> = ({ isLoading, onClick }) => {
  useEffect(() => console.log('hh'));
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

export default React.memo(DeleteButton);
