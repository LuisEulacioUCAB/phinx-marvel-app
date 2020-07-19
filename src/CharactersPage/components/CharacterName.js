import React from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';

const NameStyled = styled('div')`
  position: absolute;
  color: white;
  font-weight: bold;
  margin-top: 10%;
  margin-left: 10%;
`;

const CharacterName = ({ name }) => {
  return <NameStyled>{name}</NameStyled>;
};

CharacterName.propTypes = {
  name: PropTypes.string.isRequired,
};

export { CharacterName };
