import './Paginate.scss';

import { PaginateProps } from './Paginate.type';
import React from 'react';
import ReactPaginate from 'react-paginate';

const Paginate: React.FC<PaginateProps> = ({
  page,
  onPageChange,
  count,
}): JSX.Element => {
  return (
    <div className="pagination__wrapper">
      <ReactPaginate
        pageCount={count}
        initialPage={page}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
        containerClassName="pagination"
        previousClassName="pagination__prev"
        nextClassName="pagination__next"
        pageClassName="pagination__page"
        pageLinkClassName="pagination__link"
        breakClassName="pagination__page"
        breakLinkClassName="pagination__link"
        activeClassName="pagination__active"
        disabledClassName="pagination__disabled"
        onPageChange={(page) => onPageChange(page.selected)}
        disableInitialCallback={true}
      />
    </div>
  );
};

export default Paginate;
