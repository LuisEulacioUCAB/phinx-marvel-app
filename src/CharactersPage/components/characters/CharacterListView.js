import React from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import { ContainerCharacter } from './ContainerCharacter';

const ContainerListStyled = styled('div')`
  padding-top: 150px;
  padding-left: 5%;
  padding-right: 5%;
`;

const CharacterListView = ({ onClick, characterList , onFavoriteClick, favorite , isShowFavorite }) => {
  return (
    <ContainerListStyled>
      {characterList.map((character, key) => {
        return <ContainerCharacter
          key={key}
          character={character}
          onClick={onClick}
          onFavoriteClick={onFavoriteClick}
          favorite={favorite}
          isShowFavorite={isShowFavorite}
        />;
      })}
    </ContainerListStyled>
  );
};

CharacterListView.defaultProps = {
  onFavoriteClick : null,
  favorite : {},
  isShowFavorite: true
};

CharacterListView.propTypes = {
  onClick: PropTypes.func.isRequired,
  characterList: PropTypes.array.isRequired,
  onFavoriteClick:PropTypes.func,
  favorite:PropTypes.object,
  isShowFavorite:PropTypes.bool,
};

export { CharacterListView };
