import React from 'react';
import  PropTypes  from 'prop-types';
import styled from '@emotion/styled';

const StyledText = styled('div')({
  fontSize: 16,
  color: '#a6e50f',
});

const ToastSuccess = ({ text = '' }) => {
  return (
    <>
      <StyledText weight="bold">{'YEP!'}</StyledText>
      <StyledText>{text}</StyledText>
    </>
  );
};

ToastSuccess.propTypes = {
  text: PropTypes.any.isRequired,
};

export  default ToastSuccess;
