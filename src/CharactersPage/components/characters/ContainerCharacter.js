import React from 'react';
import { PropTypes } from 'prop-types';
import { CharacterInfo } from './CharacterInfo';
import styled from '@emotion/styled';
import { marvelConstants } from '../../../shared/marvel.constants';
import { CharacterListView } from './CharacterListView';

const ContainerCharacterStyled = styled('div')`
  width: 22%;
  height: 350px;
  margin: 1.5%;
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
`;

const ContainerCharacter = ({ character, onClick , onFavoriteClick , favorite ,isShowFavorite}) => {
  return (
    <ContainerCharacterStyled onClick={(event) => onClick(event,character)}>
      <CharacterInfo
        character={character}
        onFavoriteClick={onFavoriteClick}
        favorite={favorite}
        isShowFavorite={isShowFavorite}
      />
    </ContainerCharacterStyled>
  );
};

ContainerCharacter.defaultProps = {
  onFavoriteClick : null,
  favorite : {},
  isShowFavorite: true

};

ContainerCharacter.propTypes = {
  character: PropTypes.object.isRequired,
  favorite: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func,
  isShowFavorite:PropTypes.bool,

};

export { ContainerCharacter };
