import React from 'react';
import styled from '@emotion/styled';
import { PropTypes } from 'prop-types';

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
    <CloseButtonStyled onClick={onClose} id={'close-modal'}>
      &times;
    </CloseButtonStyled>
  );
};

CloseButtonDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export { CloseButtonDialog };
