import React from 'react';
import styled from '@emotion/styled';
import { PropTypes } from 'prop-types';
import {marvelConstants} from '../../../shared/marvel.constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

const CloseButtonStyled = styled('span')`
  color: #aaaaaa;
  float: right;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 15px;
  margin-top: 10px;
`;

const CloseButtonDialog = ({ onClose }) => {
  return (
    <CloseButtonStyled onClick={onClose} id={marvelConstants.CLOSE_MODAL_ID}>
      &times;
    </CloseButtonStyled>
  );
};

CloseButtonDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export { CloseButtonDialog };
