import React from 'react';
import PropTypes from 'prop-types';
import {generateCustomFilterQuery} from '../../../shared/utils';
import styled from '@emotion/styled';

const ContainerLinkStyled = styled('div')`
    border: 1px solid #aaaaaa;
    background-color: white;
    height: 50px;
    padding: 5px;
    display:flex;
    margin-bottom:15px;
    border-radius:5px;
    & > div {
      margin:auto;
      
    }
    
   & > div:hover {
    cursor:pointer;
    color: #3eb7f9 !important;

   }
`;


const SearchList = ({searchList, history}) => {

  const host = window.location.host;
  
  return (
    <div style={{paddingLeft:'6%',paddingRight:'6%'}}>
      {
        searchList.map((search, key) => {
          const query = generateCustomFilterQuery(search);
          const url = '/' + query;
          return (
            <ContainerLinkStyled key={key}>
              <div onClick={()=> { history.push(url);}}>{host}{query}</div>
            </ContainerLinkStyled>
          );
        })
      }
    </div>

  );
};


SearchList.propTypes = {
  searchList: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};


export {SearchList};