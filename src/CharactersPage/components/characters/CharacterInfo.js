import { PropTypes } from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import { CharacterName } from './CharacterName';
import {Favorite} from '../../../_components/Favorite';
import {marvelConstants} from '../../../shared/marvel.constants';
import { ContainerCharacter } from './ContainerCharacter';

const CharacterInfoContainer = styled('div')`
  background-image: ${(props) => (props.bgImg ? `url(${props.bgImg})` : '')};
  background-size: 100%;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  position: relative;
  background-size: cover;
`;

const CharacterInfo = ({ character, onFavoriteClick,favorite, isShowFavorite}) => {
  const backgroundImage = character.thumbnail ? `${character.thumbnail.path}.${character.thumbnail.extension}` : '';
  return (
    <CharacterInfoContainer bgImg={backgroundImage} id={marvelConstants.CONTAINER_CHARACTER_ID}>
      {
        isShowFavorite ? (
          <Favorite
            type={marvelConstants.CHARACTER_TYPE}
            onFavoriteClick={onFavoriteClick}
            data={character}
            favorite={favorite}
          />
        ) :null
      }

      <CharacterName name={character.name} />
    </CharacterInfoContainer>
  );
};

CharacterInfo.defaultProps = {
  onFavoriteClick : null,
  favorite : {},
  isShowFavorite: true

};

CharacterInfo.propTypes = {
  character: PropTypes.object.isRequired,
  favorite: PropTypes.object,
  onFavoriteClick: PropTypes.func,
  isShowFavorite:PropTypes.bool,

};

export { CharacterInfo };
