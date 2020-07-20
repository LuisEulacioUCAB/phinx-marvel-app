import React from 'react';
import { PropTypes } from 'prop-types';
import { CharacterInfo } from './CharacterInfo';
import styled from '@emotion/styled';
const ContainerCharacterStyled = styled('div')`
  width: 22.5%;
  height: 350px;
  margin: 15px;
  display: inline-block;

  &:hover {
    cursor: pointer;
  }
`;

const ContainerCharacter = ({ character, onClick }) => {
  return (
    <ContainerCharacterStyled onClick={() => onClick(character)}>
      <CharacterInfo name={character.name} thumbnail={character.thumbnail} />
    </ContainerCharacterStyled>
  );
};

ContainerCharacter.propTypes = {
  character: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { ContainerCharacter };
