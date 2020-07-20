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

  @media screen and (max-width: 480px) {
    & {
      width: 100%;
      margin: 0 0 15px 0;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    & {
      width: 47%;
      margin: 1.5%;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    & {
      width: 30%;
      margin: 1.5%;
    }
  }

  @media (min-width: 1025px) and (max-width: 1200px) {
    & {
      width: 22%;
      margin: 1.5%;
    }
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
