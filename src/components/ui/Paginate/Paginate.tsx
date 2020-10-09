import './Paginate.scss';

import React from 'react';
import ReactPaginate from 'react-paginate';
import Wrapper from '../Wrapper/Wrapper';

type Props = {
  page: number;
  onPageChange: (page: number) => void;
  count: number;
};

const Paginate: React.FC<Props> = ({
  page,
  onPageChange,
  count,
}): JSX.Element => {
  console.log(page);
  return (
    <Wrapper style={{ display: 'flex', justifyContent: 'center' }}>
      <ReactPaginate
        pageCount={count}
        forcePage={page}
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
      />
    </Wrapper>
  );
};

export default React.memo(Paginate);
