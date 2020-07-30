import React from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import {ComicInfo} from './ComicInfo';

const ContainerContainerStyled = styled('div')`
  width: 22%;
  height: 350px;
  margin: 1.5%;
  display: inline-block;

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

const ContainerComic = ({ comic , onFavoriteClick , favorite ,isShowFavorite}) => {
  return (
    <ContainerContainerStyled>
      <ComicInfo
        comic={comic}
        onFavoriteClick={onFavoriteClick}
        favorite={favorite}
        isShowFavorite={isShowFavorite}
      />
    </ContainerContainerStyled>
  );
};

ContainerComic.defaultProps = {
  onFavoriteClick : null,
  favorite : {},
  isShowFavorite: true

};

ContainerComic.propTypes = {
  comic: PropTypes.object.isRequired,
  favorite: PropTypes.object,
  onFavoriteClick: PropTypes.func,
  isShowFavorite:PropTypes.bool,
};

export { ContainerComic };