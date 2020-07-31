import React from 'react';
import styled from '@emotion/styled';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

const LinkStyled = styled(Link)`
  width: 40px;
  height: 40px;
  margin-left: 15px;
  border: 1px solid #aaaaaa;
  background-color: white;
  color: #aaaaaa;
  font-size: 20px;
  cursor: pointer;
  padding:8px;
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

const ContainerButtonStyled = styled('div')`
  position: relative;
`;

const LinkTextStyled = styled('span')`
  padding-top: 1px;
  padding-left: 5px;
`;

const ActionButton = ({link, fontIcon, text}) =>{
  return (
    <>
      <ContainerButtonStyled>
        <LinkStyled to={link}>
          <FontAwesomeIcon icon={fontIcon} />
          <LinkTextStyled >
            {text}
          </LinkTextStyled>
        </LinkStyled>
      </ContainerButtonStyled>
    </>
  );
};


ActionButton.defaultProps ={
  fontIcon:{}
};

ActionButton.propTypes = {
  link: PropTypes.string.isRequired,
  fontIcon:PropTypes.object,
  text:PropTypes.string.isRequired
};

export { ActionButton };
