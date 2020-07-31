import React from 'react';
import  PropTypes  from 'prop-types';
import styled from '@emotion/styled';

const StyledText = styled('div')({
  fontSize: 16,
  color: '#ff6d4a',
});

const ToastErrors = ( {message} ) => {
  let values = Array.isArray(message) ? message.map((value) => {
    return <li key={value}>{value}</li>;
  }): message;

  return (
    <>
      <StyledText weight="bold">{'Ooops!'}</StyledText>
      <StyledText>
        <ol>
          {values}
        </ol>
      </StyledText>
    </>
  );
};

ToastErrors.propTypes = {
  message: PropTypes.any.isRequired,
};

export default ToastErrors;