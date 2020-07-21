import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Pagination from "react-js-pagination";

const ContainerPaginationStyled = styled('div')`
  display:flex;
  width:100%;
  text-align:center;
`;

const PaginateContainerStyled = styled('div')`
  margin: 0 auto;
`;


const PaginationComponent = ({onChange	,currentPage,total, pageSize}) =>{

  return(
    <ContainerPaginationStyled>
      <PaginateContainerStyled>
        <Pagination
          onChange	={onChange}
          activePage={currentPage}
          itemsCountPerPage={pageSize}
          totalItemsCount={total}
          pageRangeDisplayed={5}
          hideFirstLastPages={true}
          hideNavigation	={true}
          itemClass={'page-item'}
          linkClass={'page-link'}
        />
      </PaginateContainerStyled>
    </ContainerPaginationStyled>

  );
};

PaginationComponent.propTypes = {
  onChange	:PropTypes.func.isRequired,
  currentPage:PropTypes.number.isRequired,
  total:PropTypes.number.isRequired,
  pageSize:PropTypes.number.isRequired,
};

export {PaginationComponent}