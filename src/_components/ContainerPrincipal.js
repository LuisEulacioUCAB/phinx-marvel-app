import React from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';

const ContainerPrincipalStyled = styled('div')`
  height: 100vh;
  background-color:#f5f5f5;
`;

const ContainerPrincipal = ({ children }) => {
  return <ContainerPrincipalStyled>{children}</ContainerPrincipalStyled>;
};

ContainerPrincipal.propTypes = {
  children: PropTypes.any.isRequired,
};

export { ContainerPrincipal };
