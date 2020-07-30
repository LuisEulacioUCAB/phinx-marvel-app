import { PropTypes } from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Favorite} from '../../../_components/Favorite';
import {marvelConstants} from '../../../shared/marvel.constants';
import {ComicName} from './ComicName';

const ComicInfoContainer = styled('div')`
  background-image: ${(props) => (props.bgImg ? `url(${props.bgImg})` : '')};
  background-size: 100%;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  position: relative;
  background-size: cover;
`;

const ComicInfo = ({ comic, onFavoriteClick,favorite, isShowFavorite}) => {
  const backgroundImage = comic.thumbnail ? `${comic.thumbnail.path}.${comic.thumbnail.extension}` : '';
  return (
    <ComicInfoContainer bgImg={backgroundImage} id={marvelConstants.CONTAINER_CHARACTER_ID}>
      {
        isShowFavorite ? (
          <Favorite
            type={marvelConstants.COMIC_TYPE}
            onFavoriteClick={onFavoriteClick}
            data={comic}
            favorite={favorite}
          />
        ) :null
      }
      <ComicName comic={comic} />
    </ComicInfoContainer>
  );
};

ComicInfo.defaultProps = {
  onFavoriteClick : null,
  favorite : {},
  isShowFavorite: true

};

ComicInfo.propTypes = {
  comic: PropTypes.object.isRequired,
  favorite: PropTypes.object,
  onFavoriteClick: PropTypes.func,
  isShowFavorite:PropTypes.bool,

};

export { ComicInfo };