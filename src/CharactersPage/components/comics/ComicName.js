import React from 'react';
import  PropTypes  from 'prop-types';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';

const NameStyled = styled(Link)`
  position: absolute;
  color: white;
  font-weight: bold;
  margin-top: 10%;
  margin-left: 10%;
    &:hover {
    cursor: pointer;
    color: #3eb7f9 !important;
  } 
`;

const ComicName = ({ comic }) => {
  return <NameStyled to={`/comic/${comic.id}`}>{comic.title}</NameStyled>;
};

ComicName.propTypes = {
  comic: PropTypes.object.isRequired,
};

export { ComicName };