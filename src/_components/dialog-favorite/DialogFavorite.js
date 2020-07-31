import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

const DropdownStyled = styled('div')` 
  display: ${props => props.display};
`;

const ButtonStyled = styled('button')`
  width: 50px;
  height: 40px;
  border: 1px solid #aaaaaa;
  background-color: white;
  color: #aaaaaa;
  font-size: 18px;
  cursor: pointer;
  text-decoration:none;

  &:focus {
    outline: none;
  }
  
  &:hover {
    text-decoration:none;
      border: 1px solid white;
      background-color: #aaaaaa;
      color: white;
  }
`;


const DialogFavorite = ({isOpen, onClickAddFavoriteSearch,fontIcon , onClick})=>{

  const display = isOpen ? 'block' : 'none';

  return(
    <div className="dropdown">
      <ButtonStyled className="btn btn-secondary" type="button" onClick={onClick}>
        <FontAwesomeIcon icon={fontIcon}/>
      </ButtonStyled>
      <DropdownStyled className={"dropdown-menu"} display={display}>
        <div className={"dropdown-item"}  onClick={onClickAddFavoriteSearch}>Add Search To Favorites</div>
        <Link className={"dropdown-item"} to={'/favorite'}>Go To Favorites</Link>
      </DropdownStyled>
    </div>
  );
};

DialogFavorite.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  fontIcon: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickAddFavoriteSearch: PropTypes.func.isRequired,
};

export {DialogFavorite}